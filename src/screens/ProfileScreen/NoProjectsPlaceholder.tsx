import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Header from '../../components/Header';
import ButtonDisplay from '../../components/ButtonDisplay';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';

type Props = {
  navigate: DrawerNavigationProp<RootDrawerParamList, 'Profile', undefined>['navigate'];
};

export default function NoProjectsPlaceholder({ navigate }: Props) {
  return (
    <View className="flex mt-3 items-center">
      <Header textClassNames="text-2xl" centered title="UH-OH!" />
      <Text className="text-2xl mb-6 text-arbor-grey text-center">You don't have any projects yet!</Text>
      <Text className="text-2xl mb-6 text-arbor-grey text-center">Click below to start browsing projects!</Text>
      <View className="flex flex-row w-24">
        <ButtonDisplay textClassNames="text-arbor-grey text-lg" text="Let's Go" onPress={() => navigate('Projects')} />
      </View>
    </View>
  );
}
