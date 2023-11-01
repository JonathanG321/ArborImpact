import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { useContext } from 'react';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';
import { Text } from 'react-native-elements';
import ScreenContainer from '../components/ScreenContainer';

export type ProfileSetup2Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 2', 'Main'>;

export default function ProfileSetup2Screen({ navigation: { navigate } }: ProfileSetup2Props) {
  // const { profileSetup } = useContext(ProfileSetupContext);
  // console.log(profileSetup);

  return (
    <ScreenContainer>
      <Text className="text-2xl mb-6 ml-6 text-[#5a5a5b]">Profile Setup 2</Text>
    </ScreenContainer>
  );
}
