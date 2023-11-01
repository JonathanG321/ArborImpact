import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { Text } from 'react-native-elements';
import { Alert, View } from 'react-native';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';
import { Profile, RootStackParamList } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import { SessionContext } from '../contexts/SessionContext';
import { supabase } from '../../supabase/supabase';
import SDGInput from '../components/SDGInput';

export type ProfileSetup2Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 2', 'Main'>;

const schema = z
  .object({
    sdg: z.array(z.string().regex(/^SDG[1-9][1-7]?$/)).default([]),
  })
  .required();

export default function ProfileSetup2Screen({ navigation: { navigate, goBack, replace } }: ProfileSetup2Props) {
  const { profileSetup } = useContext(ProfileSetupContext);
  const { session } = useContext(SessionContext);

  if (!profileSetup) {
    Alert.alert("Profile Doesn't Exist!");
    goBack();
    return;
  }

  const { getValues, setValue, handleSubmit } = useForm<Pick<Profile, 'sdg'>>({
    resolver: zodResolver(schema),
    defaultValues: { sdg: [] },
  });

  const onSubmit: SubmitHandler<Pick<Profile, 'sdg'>> = ({ sdg }) => {
    if (!session) return;
    const newProfile = { ...profileSetup, sdg, id: session.user.id };
    supabase.from('profiles').upsert(newProfile);
    replace('Home', { session });
  };

  return (
    <ScreenContainer>
      <View className="flex justify-center items-center">
        <View className="flex flex-row justify-center">
          <Text className="text-2xl mb-6 text-[#5a5a5b] text-center mx-5">
            Select the SDGs that you're interested in
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center w-11/12 flex-wrap">
          {Array.from({ length: 17 }).map((_, index) => {
            return <SDGInput key={index} index={index + 1} setSDGValue={setValue} getValues={getValues} />;
          })}
        </View>
      </View>
    </ScreenContainer>
  );
}
