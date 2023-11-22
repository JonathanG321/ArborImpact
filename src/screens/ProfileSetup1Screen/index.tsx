import { useContext, useEffect } from 'react';
import { Text, View, TextStyle, ViewStyle, Alert, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTailwind } from 'nativewind';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import DatePicker from '../../components/DatePicker';
import { Profile, RootStackParamList } from '../../../lib/types';
import { ProfileSetupContext } from '../../contexts/ProfileSetupContext';
import FormInput from '../../components/FormInput';
import { emptyProfile } from '../../../lib/templates';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import AvatarSelect from '../../components/AvatarSelect';
import { LoadingContext } from '../../contexts/LoadingContext';

export type ProfileSetup1Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 1', 'Main'>;

const schema = z
  .object({
    firstName: z.string().min(2, 'Too Short!').default(''),
    lastName: z.string().min(2, 'Too Short!').default(''),
    location: z.string().min(2, 'Too Short!').default(''),
    birthDate: z.string(),
    avatarImage: z
      .object({
        height: z.number(),
        uri: z.string(),
        width: z.number(),
        assetId: z.string().optional().nullable(),
        base64: z.string().optional().nullable(),
        duration: z.number().optional().nullable(),
        fileName: z.string().optional().nullable(),
        fileSize: z.number().optional(),
        type: z.string().optional(),
        exif: z.record(z.string()).optional().nullable(),
      })
      .required(),
  })
  .required();

export default function ProfileSetup1Screen({ navigation: { navigate } }: ProfileSetup1Props) {
  const { setProfileSetup } = useContext(ProfileSetupContext);
  const { setIsLoading } = useContext(LoadingContext);

  const {
    control,
    getValues,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<Exclude<Profile, 'sdg'>>({ resolver: zodResolver(schema), defaultValues: emptyProfile });

  const onSubmit: SubmitHandler<Profile> = (form) => {
    setProfileSetup(form);
    navigate('Profile Setup 2');
  };

  const onError: SubmitErrorHandler<Profile> = async (err) => {
    Object.keys(err).map((key) => {
      if (key === 'root') return;
      const profileKey = key as keyof Profile;
      const errors = { ...err, avatarImage: err.avatarImage?.uri };
      setError(profileKey, errors[profileKey] || {});
    });
    Alert.alert('Some fields contain Errors. Please fix them before moving on.');
  };

  const handleDateText = (): string => {
    const birthDateString = getValues().birthDate;
    const birthDate = new Date(birthDateString);
    return birthDate
      ? `${birthDate.getMonth() + 1} / ${birthDate.toDateString().split(' ')[2]} / ${birthDate.getFullYear()}`
      : 'No value Selected';
  };
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <ScreenContainer>
      <Header title="HI, MY NAME IS" />
      <View className="flex flex-row">
        <FormInput
          control={control}
          outerClassName="w-1/2"
          field="firstName"
          placeholder="First Name"
          inputClassName="rounded-bl-lg"
          inputContainerClassName="border-0 pl-1"
          error={formErrors.firstName?.message}
        />
        <FormInput
          control={control}
          outerClassName="w-1/2"
          field="lastName"
          placeholder="Last Name"
          inputClassName="rounded-br-lg"
          iconClassName="right-2"
          inputContainerClassName="border-0 pr-1"
          error={formErrors.lastName?.message}
        />
      </View>
      <Header title="AND I WAS BORN ON" />
      <View className="mx-4 self-stretch">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={new Date(value)}
              className="border-b-2 rounded-b-lg"
              style={useTailwind({ className: 'h-10' }) as ViewStyle}
              textInputStyle={useTailwind({ className: 'font-bold text-xl px-2' }) as TextStyle}
              text={handleDateText()}
              isNullable={false}
              onDateChange={(date) => {
                if (!date) return;
                onChange({ target: { value: date.toDateString() } });
              }}
            />
          )}
          name="birthDate"
        />
      </View>
      <Header title="CURRENTLY BASED OUT ON" />
      <FormInput
        control={control}
        field="location"
        placeholder="Location"
        inputClassName="rounded-b-lg"
        inputContainerClassName="border-0 px-2.5"
        iconClassName="right-3"
        error={formErrors.location?.message}
      />
      <Header title="THIS IS ME!" />
      <View>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => <AvatarSelect image={value} onSelect={onChange} />}
          name="avatarImage"
        />
      </View>
      <View className="flex flex-row justify-end mt-10 mr-5">
        <TouchableOpacity onPress={handleSubmit(onSubmit, onError)}>
          <Text className="text-lg">Next →</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
