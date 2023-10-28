import { useContext, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/utils';
import DatePicker from '../components/DatePicker';
import { ProfileSetupContext } from '../contexts/ProfileSetupContext';

export type ProfileSetup1Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 1', 'Main'>;

export default function ProfileSetup1Screen({ navigation: { navigate } }: ProfileSetup1Props) {
  const { profile, setProfile } = useContext(ProfileSetupContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const handleDateText = (): string => (birthDate ? birthDate.toDateString() : 'No value Selected');

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
        <DatePicker
          className=""
          value={birthDate}
          text={handleDateText()}
          isNullable={false}
          onDateChange={(date) => setBirthDate(date || new Date())}
        />
      </View>
      <View className="py-1 self-stretch">
        <Pressable className="flex items-center px-2 py-1" onPress={() => navigate('Profile Setup 2')}>
          <Text className="text-lg">Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
