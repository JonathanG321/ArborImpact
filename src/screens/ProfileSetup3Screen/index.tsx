import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { Text } from 'react-native-elements';
import { Alert, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DBProfileWithSDGs, Profile, RootStackParamList } from '../../../lib/types';
import ScreenContainer from '../../components/ScreenContainer';
import SDGInput from './SDGInput';
import { ProfileSetupContext } from '../../contexts/ProfileSetupContext';
import { includedSDGs } from '../../../lib/templates';
import { LoadingContext } from '../../contexts/LoadingContext';
import Queries from '../../../lib/supabaseQueries';
import { UserContext } from '../../contexts/UserContext';

export type ProfileSetup3Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 3', 'Main'>;

const schema = z
  .object({
    sdg: z.array(z.string().regex(/^SDG[0-9][0-9]?$/)).default([]),
  })
  .required();

export default function ProfileSetup3Screen({ navigation: { goBack, reset } }: ProfileSetup3Props) {
  const { setIsLoading } = useContext(LoadingContext);
  const { profileSetup } = useContext(ProfileSetupContext);
  const { setProfile, session } = useContext(UserContext);

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
    const { error: avatarError } = await Queries.uploadSupabaseImage(filePath, 'avatars', formData);
    if (avatarError) {
      Alert.alert('An image error has occurred. Please go back, reselect your image, and try again.');
      setIsLoading(false);
      return;
    }

    const newProfile: DBProfileWithSDGs = {
      birth_date: profileSetup.birthDate,
      first_name: profileSetup.firstName,
      last_name: profileSetup.lastName,
      location: profileSetup.location,
      want_difference_world: profileSetup.wantDifferenceWorld,
      want_diversify_portfolio: profileSetup.wantDiversifyPortfolio,
      want_specific_cause: profileSetup.wantSpecificCause,
      want_tax_incentives: profileSetup.wantTaxIncentives,
      avatar_url: filePath,
      SDGs: sdg,
      id: session.user.id,
      requesting_funds: false,
      seen_marketplace: false,
      made_first_donation: false,
      created_at: new Date().toUTCString(),
    };
    const [{ error }, ...rest] = await Queries.upsertSupabaseProfile(newProfile, session.user.id);
    if (error) {
      Alert.alert('An error has occurred. Please try again later');
      console.log(error);
      setIsLoading(false);
      return;
    }
    rest.forEach((result) => {
      if (result.error) {
        console.log(result.error);
      }
    });
    setProfile({ ...profileSetup, sdg, balance: 0 });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <ScreenContainer>
      <View className="flex items-center h-full">
        <View className="flex flex-row justify-center">
          <Text className="text-2xl mb-6 text-arbor-grey text-center mx-5">
            Select the SDGs that you're interested in
          </Text>
        </View>
        <View className="flex flex-row justify-center items-center w-11/12 flex-wrap">
          {Array.from({ length: 17 }).map((_, index) => {
            if (!includedSDGs.includes(index + 1)) return;
            return <SDGInput key={index} index={index + 1} setSDGValue={setValue} getValues={getValues} />;
          })}
        </View>
      </View>
      <View className="flex items-end px-3 py-1">
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="text-lg mr-5">Done</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
