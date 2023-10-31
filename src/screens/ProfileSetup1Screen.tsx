import { useContext } from 'react';
import { Text, View, Pressable, TextStyle, ViewStyle, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTailwind } from 'nativewind';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller, FieldErrors, SubmitErrorHandler } from 'react-hook-form';
import DatePicker from '../components/DatePicker';
import { FormSwitchProps, Profile, RootStackParamList } from '../../lib/types';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';
import FormSwitch from '../components/FormSwitch';
import FormInput from '../components/FormInput';
import { emptyProfile } from '../../lib/templates';
import ProfileSetupHeader from '../components/ProfileSetupHeader';
import LineBreak from '../components/LineBreak';
import ScreenContainer from '../components/ScreenContainer';

export type ProfileSetup1Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 1', 'Main'>;

const schema = z
  .object({
    firstName: z.string().min(2, 'First Name must be at least 2 characters long').default(''),
    lastName: z.string().min(2, 'Last Name must be at least 2 characters long').default(''),
    location: z.string().min(2, 'Location must be at least 2 characters long').default(''),
    birthDate: z.date(),
    wantDifferenceWorld: z.boolean().default(false),
    wantDiversifyPortfolio: z.boolean().default(false),
    wantSpecificCause: z.boolean().default(false),
    wantTaxIncentives: z.boolean().default(false),
  })
  .required();

export default function ProfileSetup1Screen({ navigation: { navigate } }: ProfileSetup1Props) {
  const { setProfileSetup } = useContext(ProfileSetupContext);

  const {
    control,
    getValues,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<Exclude<Profile, 'svg'>>({ resolver: zodResolver(schema), defaultValues: emptyProfile });

  const onSubmit: SubmitHandler<Profile> = (data) => {
    setProfileSetup(data);
    navigate('Profile Setup 2');
  };

  const onError: SubmitErrorHandler<Profile> = async (errors) => {
    Object.keys(errors).map((key) => {
      if (key === 'root') return;
      const profileKey = key as keyof Profile;
      setError(profileKey, errors[profileKey] || {});
    });
    Alert.alert('Some fields contain Errors. Please fix them before moving on.');
  };

  const handleDateText = (): string => {
    const birthDate = getValues().birthDate;
    return birthDate
      ? `${birthDate.getMonth() + 1} / ${birthDate.toDateString().split(' ')[2]} / ${birthDate.getFullYear()}`
      : 'No value Selected';
  };

  const fundReasonProps: FormSwitchProps<Profile>[] = [
    { field: 'wantDifferenceWorld', description: 'I WANT TO MAKE A DIFFERENCE IN THE WORLD', control },
    { field: 'wantDiversifyPortfolio', description: 'I WANT TO DIVERSIFY MY PORTFOLIO', control },
    { field: 'wantTaxIncentives', description: 'I AM INTERESTED IN TAX INCENTIVES', control },
    { field: 'wantSpecificCause', description: 'I AM PASSIONATE ABOUT A SPECIFIC CAUSE', control },
  ];

  return (
    <ScreenContainer>
      <ProfileSetupHeader title="HI, MY NAME IS" />
      <View className="flex flex-row">
        <FormInput
          control={control}
          outerClassName="w-1/2"
          field="firstName"
          placeholder="First Name"
          inputClassName="px-3 border-b-2 rounded-bl-lg"
          inputContainerClassName="border-0 pl-1"
          error={formErrors.firstName?.message}
        />
        <FormInput
          control={control}
          outerClassName="w-1/2"
          field="lastName"
          placeholder="Last Name"
          inputClassName="px-3 border-b-2 rounded-br-lg"
          inputContainerClassName="border-0 pr-1"
          error={formErrors.lastName?.message}
        />
      </View>
      <ProfileSetupHeader title="AND I WAS BORN ON" />
      <View className="mx-4 self-stretch">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={value}
              className="border-b-2 rounded-b-lg"
              style={useTailwind({ className: 'h-10' }) as ViewStyle}
              textInputStyle={useTailwind({ className: 'font-bold text-xl px-2' }) as TextStyle}
              text={handleDateText()}
              isNullable={false}
              onDateChange={(date) => {
                if (!date) return;
                onChange({ target: { value: date } });
              }}
            />
          )}
          name="birthDate"
        />
      </View>
      <ProfileSetupHeader title="CURRENTLY BASED OUT ON" />
      <FormInput
        control={control}
        field="location"
        placeholder="Location"
        inputClassName="px-3 border-b-2 rounded-b-lg"
        inputContainerClassName="border-0 px-2.5"
        error={formErrors.location?.message}
      />
      <LineBreak />
      <Text className="text-2xl mb-6 ml-6 text-[#5a5a5b]">I choose to fund projects because:</Text>
      {fundReasonProps.map((props) => (
        <FormSwitch key={props.description} {...props} />
      ))}
      <View className="py-1 self-stretch">
        <Pressable className="flex items-end px-3 py-1" onPress={handleSubmit(onSubmit, onError)}>
          <Text className="text-lg mr-5">Next {'-->'}</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
type d = keyof FieldErrors<Profile>;
