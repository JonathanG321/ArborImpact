import { useState } from 'react';
import { Text, View, Alert, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import { DatePicker } from 'react-native-woodpicker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/utils';
import { styled } from 'nativewind';
import LoadingScreen from './LoadingScreen';

const StyledDatePicker = styled(DatePicker);

type Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 1', 'Main'>;

type ProfileFormError = { isError: boolean; firstName?: string; lastName?: string; location?: string };
const errorTemplate = { isError: false } as ProfileFormError;

export default function ProfileSetup1Screen({ navigation: { navigate } }: Props) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(errorTemplate);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [wantDifferenceWorld, setWantDifferenceWorld] = useState(false);
  const [wantDiversifyPortfolio, setWantDiversifyPortfolio] = useState(false);
  const [wantSpecificCause, setWantSpecificCause] = useState(false);
  const [wantTaxIncentives, setWantTaxIncentives] = useState(false);

  const handleDateText = (): string => (birthDate ? birthDate.toDateString() : 'No value Selected');

  if (loading) return <LoadingScreen />;

  return (
    <View className="p-3 mt-10">
      <View className="py-1 flex items-center">
        <Text className="font-bold text-xl">HI, MY NAME IS</Text>
      </View>
      <View className="flex flex-row">
        <View className="w-1/2">
          <Input placeholder="First Name" value={firstName} onChangeText={(text) => setFirstName(text)} />
        </View>
        <View className="w-1/2">
          <Input placeholder="Last Name" value={lastName} onChangeText={(text) => setLastName(text)} />
        </View>
      </View>
      <View className="py-1 flex items-center">
        <Text className="font-bold text-xl">AND I WAS BORN ON</Text>
      </View>
      <View>
        <StyledDatePicker
          className=""
          value={birthDate}
          text={handleDateText()}
          isNullable={false}
          onDateChange={(date) => setBirthDate(date || new Date())}
        />
      </View>
      <View className="py-1 self-stretch">
        <Pressable
          className="flex items-center px-2 py-1"
          onPress={() => {
            const form = {
              birthDate,
              firstName,
              lastName,
              location,
              wantDifferenceWorld,
              wantDiversifyPortfolio,
              wantSpecificCause,
              wantTaxIncentives,
            };
            const checkedErrors = verifyForm(form);
            if (!checkedErrors.isError) {
              setErrors(errorTemplate);
              navigate('Profile Setup 2', form);
              return;
            }
            Alert.alert('Some fields contain errors, please fix them before moving on.');
            setErrors(checkedErrors);
          }}
        >
          <Text className="text-lg">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

function verifyForm({ firstName, lastName, location }: RootStackParamList['Profile Setup 2']) {
  let errors = { isError: false } as ProfileFormError;
  if (firstName.length === 0) {
    errors.firstName = 'First Name field cannot be empty';
    errors.isError = true;
  }
  if (lastName.length === 0) {
    errors.lastName = 'Last Name field cannot be empty';
    errors.isError = true;
  }
  if (location.length === 0) {
    errors.location = 'Location field cannot be empty';
    errors.isError = true;
  }
  return errors;
}
