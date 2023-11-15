import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Input, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTailwind } from 'nativewind';
import { TextStyle } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { RootDrawerParamList } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';
import { SDGs, dayMilliseconds } from '../../lib/templates';
import { cn } from '../../lib/utils';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Project'>;

export default function ProjectScreen({
  route: {
    params: { project },
  },
}: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [donation, setDonation] = useState<number | null>(0);
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
          <View className="bg-white h-1/5 w-8/12 rounded-2xl flex items-center py-6">
            <Text className="text-xl font-bold">Donate how much?</Text>
            <CurrencyInput
              className={cn('border pl-3')}
              prefix="$"
              precision={2}
              minValue={0}
              // labelStyle={useTailwind({ className: 'font-normal text-black text-xl mb-2' }) as TextStyle}
              // containerStyle={useTailwind({ className: 'py-0' }) as ViewStyle}
              value={donation}
              onChangeValue={setDonation}
            />
            {/* <Input
              label={'Amount'}
            /> */}
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text>Hide Modal</Text>
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
