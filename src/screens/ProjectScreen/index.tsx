import { useState } from 'react';
import { Text } from 'react-native-elements';
import { View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';
import ScreenContainer from '../../components/ScreenContainer';
import LineBreak from '../../components/LineBreak';
import ButtonDisplay from '../../components/ButtonDisplay';
import { SDGs, dayMilliseconds } from '../../../lib/templates';
import DonationModal from './DonationModal';
import Avatar from '../../components/Avatar';

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
  const [showSpendingReport, setShowSpendingReport] = useState(false);
  const extraImages = project.extraImages || [];
  const projectImages = project.projectImage ? [project.projectImage].concat(extraImages) : extraImages;

  return (
    <ScreenContainer scrollable>
      <View className="flex items-center flex-1 pb-16">
        <View className="flex flex-row items-center mb-4">
          <Text className="text-2xl font-extrabold">{project.name.toLocaleUpperCase()}</Text>
          <Avatar image={SDGs[project.sdg]} accessibilityLabel="SDG" classNames="w-10 h-10 rounded-lg ml-3" />
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
          <ButtonDisplay
            text={showSpendingReport ? 'HIDE SPENDING REPORT' : 'VIEW SPENDING REPORT'}
            classNames="mx-4"
            textClassNames="font-bold"
            onPress={() => setShowSpendingReport(!showSpendingReport)}
          />
        </View>
        {showSpendingReport && (
          <View className="w-full px-4 mb-5">
            <View className="w-full p-4 bg-white shadow rounded-lg shadow-gray-500">
              <View className="flex flex-row justify-between border-b-4">
                <Text className="font-bold text-xl text-center w-28">Item</Text>
                <Text className="font-bold text-xl text-center w-28">Cost</Text>
              </View>
              {project.spendingReport.map((reportItem) => (
                <View key={reportItem.id + reportItem.item} className="flex flex-row justify-between border-b-4">
                  <Text className="text-lg w-28">{reportItem.item}</Text>
                  <Text className="text-lg w-28">${reportItem.cost}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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
          <Text className="text-2xl font-extrabold mb-1">
            {[...new Map(project.donations.map((donation) => [donation.profileId, donation])).values()].length}
          </Text>
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
          value={donation}
          setValue={setDonation}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          donated={donated}
          setDonated={setDonated}
          navigation={navigation}
          project={project}
        />
        <Text className="text-xl font-extrabold mb-4">IMAGE AND VIDEO GALLERY</Text>
        <LineBreak />
        <View className="flex flex-row flex-wrap justify-center">
          {projectImages.map((image, i) => (
            <Avatar
              key={image.uri + i}
              image={image}
              accessibilityLabel="Project Image"
              classNames="w-24 h-24 rounded-md m-3"
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}
