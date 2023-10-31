import { useContext } from 'react';
import { Text, View, Pressable, TextStyle, ViewStyle } from 'react-native';
import { Input, Switch } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTailwind } from 'nativewind';
import { z } from 'zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import DatePicker from '../components/DatePicker';
import { FormSwitchProps, Profile, RootStackParamList } from '../../lib/types';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';
import FormSwitch from '../components/FormSwitch';
import FormInput from '../components/FormInput';
import { emptyProfile } from '../../lib/templates';

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
    defaultValues: emptyProfile,
    shouldUseNativeValidation: true,
  });

  const onSubmit: SubmitHandler<Profile> = (data) => {
    // console.log(data);
    // if (errors) {
    //   console.error(errors);
    //   return;
    // }
    setProfileSetup(data);
    navigate('Profile Setup 2');
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
    <View className="p-3 mt-10">
      <View className="py-1 flex items-center">
        <Text className="font-bold text-xl mb-2">HI, MY NAME IS</Text>
      </View>
      <View className="flex flex-row">
        <FormInput
          control={control}
          className="w-1/2"
          field="firstName"
          placeholder="First Name"
          inputClassName="px-3 border-b-2 rounded-bl-lg"
          inputContainerStyle={useTailwind({ className: 'border-0 pl-1' }) as ViewStyle}
        />
        <FormInput
          control={control}
          className="w-1/2"
          field="lastName"
          placeholder="Last Name"
          inputClassName="px-3 border-b-2 rounded-br-lg"
          inputContainerStyle={useTailwind({ className: 'border-0 pr-1' }) as ViewStyle}
        />
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
      <FormInput
        control={control}
        field="location"
        placeholder="Location"
        inputClassName="px-3 border-b-2 rounded-b-lg"
        inputContainerStyle={useTailwind({ className: 'border-0 px-2.5' }) as ViewStyle}
      />
      <View className="px-2 mb-2">
        <View className="border-b-2 mx-2" />
      </View>
      <Text className="text-2xl mb-6 ml-6 text-[#5a5a5b]">I choose to fund projects because:</Text>
      {fundReasonProps.map((props) => (
        <FormSwitch {...props} />
      ))}
      <View className="py-1 self-stretch">
        <Pressable className="flex items-center px-3 py-1" onPress={(e) => onSubmit(getValues(), e)}>
          <Text className="text-lg">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
