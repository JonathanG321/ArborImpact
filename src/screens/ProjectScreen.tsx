import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { useHeaderHeight } from '@react-navigation/elements';
import { Text } from 'react-native-elements';
import { RootDrawerParamList } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import { View } from 'react-native';
import LineBreak from '../components/LineBreak';
import ButtonDisplay from '../components/ButtonDisplay';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Project'>;

export default function ProjectScreen({
  navigation: { navigate, setOptions },
  route: {
    params: { project },
  },
}: Props) {
  const headerHeight = useHeaderHeight();
  setOptions({ headerLeft: () => <HeaderBackButton onPress={() => navigate('Projects')} /> });

  return (
    <ScreenContainer>
      <View className="flex items-center flex-1">
        <Text className="text-2xl font-extrabold mb-4">{project.name.toLocaleUpperCase()}</Text>
        <LineBreak />
        <View className="w-full pl-4">
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
        <View className="w-full pl-4">
          <Text className="text-2xl text-blue-500 mb-1">
            {project.donationCurrency} {project.donations.reduce((total, current) => total + current, 0).toFixed(2)}
          </Text>
          <Text className="text-md font-extrabold mb-4">
            PLEDGED OF {project.donationCurrency} {project.fundingGoal.toLocaleString()}
          </Text>
          <Text className="text-xl font-extrabold mb-1">{project.donations.length}</Text>
          <Text className="text-md font-extrabold mb-4">PROJECT FUNDERS</Text>
          <Text className="text-xl font-extrabold mb-1">{}</Text>
          <Text className="text-md font-extrabold mb-4">DAYS TO GO</Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
