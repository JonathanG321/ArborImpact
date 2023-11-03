import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { Text } from 'react-native-elements';
import { Alert, Pressable, View } from 'react-native';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Profile, RootStackParamList } from '../../lib/types';
import ScreenContainer from '../components/ScreenContainer';
import { SessionContext } from '../contexts/SessionContext';
import { supabase } from '../../supabase/supabase';
import SDGInput from '../components/SDGInput';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';
import { ProfileContext } from '../contexts/ProfileContext';
import { includedSDGs } from '../../lib/templates';
import { LoadingContext } from '../contexts/LoadingContext';

export type ProfileSetup2Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 2', 'Main'>;

const schema = z
  .object({
    sdg: z.array(z.string().regex(/^SDG[1-9][1-7]?$/)).default([]),
  })
  .required();

export default function ProfileSetup2Screen({ navigation: { goBack, reset } }: ProfileSetup2Props) {
  const { setIsLoading } = useContext(LoadingContext);
  const { profileSetup } = useContext(ProfileSetupContext);
  const { setProfile } = useContext(ProfileContext);
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

  const onSubmit: SubmitHandler<Pick<Profile, 'sdg'>> = async ({ sdg }) => {
    if (!session) return;
    if (!profileSetup.avatarImage) {
      throw new Error('Avatar Image Does Not Exist!');
    }
    setIsLoading(true);

    const file = profileSetup.avatarImage;

    const photo = {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    };

    const formData = new FormData();
    formData.append('file', photo as any);

    const fileExt = file.fileName?.split('.').pop();
    const filePath = `${Math.random()}.${fileExt}`;

    const newProfile = {
      birth_date: profileSetup.birthDate,
      first_name: profileSetup.firstName,
      last_name: profileSetup.lastName,
      location: profileSetup.location,
      want_difference_world: profileSetup.wantDifferenceWorld,
      want_diversify_portfolio: profileSetup.wantDiversifyPortfolio,
      want_specific_cause: profileSetup.wantSpecificCause,
      want_tax_incentives: profileSetup.wantTaxIncentives,
      avatar_url: filePath,
      sdg,
      id: session.user.id,
    };
    const [{ error }, { error: avatarError }] = await Promise.all([
      supabase.from('profiles').upsert(newProfile),
      supabase.storage.from('avatars').upload(filePath, formData),
    ]);
    if (avatarError) {
      Alert.alert('An image error has occurred. Please go back, reselect your image, and try again.');
      return;
    }
    if (error) {
      Alert.alert('An error has occurred. Please try again later');
      return;
    }
    setProfile({ ...profileSetup, sdg });
    reset({ index: 0, routes: [{ name: 'Home', params: { session } }] });
    setIsLoading(false);
  };

  return (
    <ScreenContainer>
      <View className="flex items-center h-full">
        <View className="flex flex-row justify-center">
          <Text className="text-2xl mb-6 text-[#5a5a5b] text-center mx-5">
            Select the SDGs that you're interested in
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center w-11/12 flex-wrap">
          {Array.from({ length: 17 }).map((_, index) => {
            if (!includedSDGs.includes(index + 1)) return;
            return <SDGInput key={index} index={index + 1} setSDGValue={setValue} getValues={getValues} />;
          })}
        </View>
        <View className="self-stretch absolute bottom-10 right-6">
          <Pressable className="flex items-end px-3 py-1" onPress={handleSubmit(onSubmit)}>
            <Text className="text-lg mr-5">Done</Text>
          </Pressable>
        </View>
      </View>
    </ScreenContainer>
  );
}
