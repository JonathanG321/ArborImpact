import { useContext, useState } from 'react';
import { Image, Text } from 'react-native-elements';
import { ActivityIndicator, Alert, View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { DBDonation, RootDrawerParamList } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';
import { SDGs, dayMilliseconds } from '../../lib/templates';
import { SessionContext } from '../contexts/SessionContext';
import { supabase } from '../../supabase/supabase';
import { ProjectsContext } from '../contexts/ProjectsContext';
import DonationModal from '../components/DonationModal';
import { ProfileContext } from '../contexts/ProfileContext';

type Props = DrawerScreenProps<RootDrawerParamList, 'Project'>;

export default function ProjectScreen({
  navigation,
  route: {
    params: { project },
  },
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [donation, setDonation] = useState<number>(0);
  const [donated, setDonated] = useState(false);
  const { session } = useContext(SessionContext);
  const { getProjects } = useContext(ProjectsContext);
  const { getProfile, profile } = useContext(ProfileContext);

  async function handleDonation() {
    if (!session) throw new Error('Session does not exist when donation button is pressed');

    const currentBallance = profile?.balance || 0;
    if (currentBallance < donation) {
      Alert.alert('You do not have enough money in your account to donate that much.');
      return;
    }
    const [{ error: donationError }, { error: profileError }] = await Promise.all([
      supabase.from('donations').insert({
        profile_id: session.user.id,
        project_id: project.id,
        donation,
      }),
      supabase.from('profiles').update({
        id: session.user.id,
        balance: currentBallance - donation,
      }),
    ]);
    if (donationError) {
      Alert.alert(donationError.message);
      return;
    }
    if (profileError) {
      Alert.alert(profileError.message);
      return;
    }
    await Promise.all([getProjects(), getProfile(session)]);
    setDonated(true);
  }

  return (
    <ScreenContainer scrollable>
      <View className="flex items-center flex-1 pb-16">
        <View className="flex flex-row items-center mb-4">
          <Text className="text-2xl font-extrabold">{project.name.toLocaleUpperCase()}</Text>
          <Image
            source={SDGs[project.sdg]}
            className="w-10 h-10 rounded-lg ml-3"
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <LineBreak />
        <View className="w-full px-4">
          <Text className="text-2xl font-extrabold mb-4">
            REGION: <Text className="font-normal text-lg">{project.region}</Text>
          </Text>
          <Text className="text-2xl font-extrabold mb-4">
            IMPACT GOAL:{' '}
            <Text className="font-normal text-lg">
              {project.impactGoal} {project.impactGoalUnit}
            </Text>
          </Text>
          <Text className="text-2xl font-extrabold mb-4">
            ACTIVITY: <Text className="font-normal text-lg">{project.activity}</Text>
          </Text>
          <Text className="text-2xl font-extrabold mb-4">
            TYPE OF IMPACT: <Text className="font-normal text-lg">{project.impactType}</Text>
          </Text>
        </View>
        <LineBreak />
        <View className="w-full flex flex-row my-6">
          <ButtonDisplay text="VIEW SPENDING REPORTS" classNames="mx-4" textClassNames="font-bold" />
        </View>
        <Text className="text-xl font-extrabold mb-4">FUNDING GOAL AND PROGRESS</Text>
        <LineBreak />
        <View className="w-full px-4">
          <Text className="text-2xl text-blue-500 mb-1">
            {project.donationCurrency}{' '}
            {project.donations.reduce((total, current) => total + current.donation, 0).toFixed(2)}
          </Text>
          <Text className="text-md font-extrabold mb-4">
            PLEDGED OF {project.donationCurrency} {project.fundingGoal.toLocaleString()}
          </Text>
          <Text className="text-2xl font-extrabold mb-1">{project.donations.length}</Text>
          <Text className="text-md font-extrabold mb-4">PROJECT FUNDERS</Text>
          <Text className="text-2xl font-extrabold mb-1">
            {((new Date(project.goalDate).getTime() - new Date().getTime()) / dayMilliseconds).toFixed(0)}
          </Text>
          <Text className="text-md font-extrabold mb-4">DAYS TO GO</Text>
        </View>
        <View className="w-full flex flex-row my-6">
          <ButtonDisplay
            onPress={() => setIsModalVisible(true)}
            text="Donate!"
            classNames="mx-4 bg-arbor-blue"
            textClassNames="font-bold text-white"
          />
        </View>
        <DonationModal
          userBalance={profile?.balance || 0}
          donation={donation}
          setDonation={setDonation}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          donated={donated}
          setDonated={setDonated}
          handleDonation={handleDonation}
          navigation={navigation}
          project={project}
        />
        <Text className="text-xl font-extrabold mb-4">IMAGE AND VIDEO GALLERY</Text>
        <LineBreak />
        <View className="flex flex-row">
          {project.extraImages?.map((image, i) => (
            <Image
              key={image.uri + i}
              source={image}
              className="w-28 h-28 rounded-md m-3"
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}
