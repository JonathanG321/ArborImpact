import { useContext } from 'react';
import { Text, View, Pressable, TextStyle, ViewStyle } from 'react-native';
import { Input, Switch } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTailwind } from 'nativewind';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import DatePicker from '../components/DatePicker';
import { Profile, RootStackParamList } from '../../lib/utils';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';

export type ProfileSetup1Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 1', 'Main'>;

const schema = z
  .object({
    firstName: z.string().default(''),
    lastName: z.string().default(''),
    location: z.string().default(''),
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
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Exclude<Profile, 'svg'>>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthDate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<Profile> = (data) => {
    // console.log(data);
    setProfileSetup(data);
  };

  const handleDateText = (): string => {
    const birthDate = getValues().birthDate;
    return birthDate
      ? `${birthDate.getMonth() + 1} / ${birthDate.toDateString().split(' ')[2]} / ${birthDate.getFullYear()}`
      : 'No value Selected';
  };

  return (
    <View className="p-3 mt-10">
      <View className="py-1 flex items-center">
        <Text className="font-bold text-xl mb-2">HI, MY NAME IS</Text>
      </View>
      <View className="flex flex-row">
        <View className="w-1/2">
          <Controller
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <Input
                {...field}
                className="px-3 border-b-2 rounded-bl-lg"
                inputContainerStyle={useTailwind({ className: 'border-0 pl-1' }) as ViewStyle}
                placeholder="First Name"
                autoCorrect={false}
              />
            )}
            name="firstName"
          />
        </View>
        <View className="w-1/2">
          <Controller
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <Input
                {...field}
                className="px-3 border-b-2 rounded-br-lg"
                inputContainerStyle={useTailwind({ className: 'border-0 pr-1' }) as ViewStyle}
                placeholder="Last Name"
                autoCorrect={false}
              />
            )}
            name="lastName"
          />
        </View>
      </View>
      <View className="py-1 flex items-center">
        <Text className="font-bold text-xl mb-2">AND I WAS BORN ON</Text>
      </View>
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
      <View className="py-1 mt-6 flex items-center">
        <Text className="font-bold text-xl mb-2">CURRENTLY BASED OUT ON</Text>
      </View>
      <View>
        <Controller
          control={control}
          rules={{ required: true, minLength: 1 }}
          render={({ field }) => (
            <Input
              {...field}
              className="px-3 border-b-2 rounded-b-lg"
              inputContainerStyle={useTailwind({ className: 'border-0 px-2.5' }) as ViewStyle}
              placeholder="Location"
              autoCorrect={false}
            />
          )}
          name="location"
        />
      </View>
      <View className="mx-6 mb-3">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Switch
              trackColor={{ false: '#fff', true: '#0e52fc' }}
              thumbColor={value ? '#fff' : '#b2b0b2'}
              ios_backgroundColor="#fff"
              onValueChange={onChange}
              value={value}
            />
          )}
          name="wantDifferenceWorld"
        />
      </View>
      <View className="mx-6 mb-3">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Switch
              trackColor={{ false: '#fff', true: '#0e52fc' }}
              thumbColor={value ? '#fff' : '#b2b0b2'}
              ios_backgroundColor="#fff"
              onValueChange={onChange}
              value={value}
            />
          )}
          name="wantDiversifyPortfolio"
        />
      </View>
      <View className="mx-6 mb-3 flex flex-row">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Switch
              trackColor={{ false: '#fff', true: '#0e52fc' }}
              thumbColor={value ? '#fff' : '#b2b0b2'}
              ios_backgroundColor="#fff"
              onValueChange={onChange}
              value={value}
              style={{ borderWidth: 2, borderColor: value ? '#0e52fc' : '#dfdddf' }}
            />
          )}
          name="wantTaxIncentives"
        />
        <Text className="font-bold text-md mb-2 ml-3">I AM INTERESTED IN TAX INCENTIVES</Text>
      </View>
      <View className="mx-6 mb-3">
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Switch
              trackColor={{ false: '#fff', true: '#0e52fc' }}
              thumbColor={value ? '#fff' : '#b2b0b2'}
              ios_backgroundColor="#fff"
              onValueChange={onChange}
              value={value}
            />
          )}
          name="wantSpecificCause"
        />
      </View>
      <View className="py-1 self-stretch">
        <Pressable className="flex items-center px-3 py-1" onPress={() => navigate('Profile Setup 2')}>
          <Text className="text-lg">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
