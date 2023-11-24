import { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SetupSwitchProps, Profile, RootStackParamList } from '../../../lib/types';
import { ProfileSetupContext } from '../../contexts/ProfileSetupContext';
import FormSwitch from '../ProfileSetup1Screen/SetupSwitch';
import { emptyProfile } from '../../../lib/templates';
import ScreenContainer from '../../components/ScreenContainer';

export type ProfileSetup2Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 2', 'Main'>;

const schema = z
  .object({
    wantDifferenceWorld: z.boolean().default(false),
    wantDiversifyPortfolio: z.boolean().default(false),
    wantSpecificCause: z.boolean().default(false),
    wantTaxIncentives: z.boolean().default(false),
  })
  .required();

export default function ProfileSetup2Screen({ navigation: { navigate } }: ProfileSetup2Props) {
  const { setProfileSetup, profileSetup } = useContext(ProfileSetupContext);

  const { control, handleSubmit } = useForm<Exclude<Profile, 'sdg'>>({
    resolver: zodResolver(schema),
    defaultValues: emptyProfile,
  });

  const onSubmit: SubmitHandler<Profile> = (form) => {
    setProfileSetup({ ...profileSetup, ...form });
    navigate('Profile Setup 3');
  };

  const fundReasonProps: SetupSwitchProps<Profile>[] = [
    {
      field: 'wantDifferenceWorld',
      description: 'I WANT TO MAKE A DIFFERENCE IN THE WORLD',
      control,
      icon: 'globe-outline',
    },
    {
      field: 'wantDiversifyPortfolio',
      description: 'I WANT TO DIVERSIFY MY PORTFOLIO',
      control,
      icon: 'briefcase',
      type: 'font-awesome',
    },
    { field: 'wantTaxIncentives', description: 'I AM INTERESTED IN TAX INCENTIVES', control, icon: 'cash-outline' },
    { field: 'wantSpecificCause', description: 'I AM PASSIONATE ABOUT A SPECIFIC CAUSE', control, icon: 'heart' },
  ];

  return (
    <ScreenContainer>
      <Text className="text-2xl mb-6 ml-6 text-arbor-grey">I choose to fund projects because:</Text>
      {fundReasonProps.map((props) => (
        <FormSwitch key={props.description} {...props} />
      ))}
      <View className="flex flex-row justify-end mt-5">
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="text-lg mr-5">Next →</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
