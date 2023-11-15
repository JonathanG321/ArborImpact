import { useContext, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ActivityIndicator, Alert, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { DBDonation, Donation, RootDrawerParamList } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';
import { SDGs, dayMilliseconds } from '../../lib/templates';
import { cn } from '../../lib/utils';
import { SessionContext } from '../contexts/SessionContext';
import { supabase } from '../../supabase/supabase';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Project'>;

export default function ProjectScreen({
  route: {
    params: { project },
  },
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [donation, setDonation] = useState<number>(0);
  const { session } = useContext(SessionContext);

  async function handleDonation() {
    if (!session) throw new Error('Session does not exist when donation button is pressed');

    const { data, error: donationRetrievalError } = await supabase
      .from('donations')
      .select('donation')
      .eq('profile_id', session?.user.id)
      .eq('project_id', project.id);
    const userDonation = data && data[0].donation ? (data[0].donation as Pick<DBDonation, 'donation'>['donation']) : 0;
    if (donationRetrievalError) {
      Alert.alert(donationRetrievalError.message);
    }

    const newDonation: Omit<DBDonation, 'created_at'> = {
      profile_id: session.user.id,
      project_id: project.id.toString(),
      updated_at: new Date().toUTCString(),
      donation: userDonation + donation,
    };
    const { error: donationError } = await supabase.from('donations').upsert(newDonation);
    if (donationError) Alert.alert(donationError.message);
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
        <Modal
          className="flex items-center"
          onBackdropPress={() => setIsModalVisible(false)}
          isVisible={isModalVisible}
        >
          <View className="bg-white h-1/5 w-8/12 rounded-2xl flex items-center px-4 py-6">
            <Text className="text-xl font-bold mb-3">Donate how much?</Text>
            <CurrencyInput
              className={cn('border px-3 py-2 w-36 text-2xl flex')}
              prefix="$"
              minValue={0}
              delimiter=","
              separator="."
              value={donation}
              renderTextInput={(textInputProps) => (
                <Input
                  {...textInputProps}
                  onChange={(e) => {
                    const newValue = parseFloat(
                      e.nativeEvent.text
                        .split('')
                        .filter((char) => /[0-9\.]/.test(char))
                        .join('')
                    );
                    if (newValue === 0) setDonation(0);
                  }}
                />
              )}
              onChangeValue={(newValue) => {
                if (typeof newValue === 'number') {
                  setDonation(newValue || 0);
                }
              }}
            />
            <TouchableOpacity onPress={() => handleDonation()}>
              <Text className="text-blue-400">Donate</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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

function arrayMove(arr: any[], fromIndex: number, toIndex: number) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
