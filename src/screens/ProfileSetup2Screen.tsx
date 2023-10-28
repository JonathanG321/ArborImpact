import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/utils';

export type ProfileSetup2Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 2', 'Main'>;

export default function ProfileSetup2Screen({ navigation: { navigate } }: ProfileSetup2Props) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <View className="p-3 mt-10">
      <View className="py-1 self-stretch">
        <Input label="First Name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
      </View>
      <View className="py-1 self-stretch">
        <Input label="Last Name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          // onPress={() => updateProfile({ firstName, lastName })}
          disabled={loading}
        >
          <Text className="text-white text-lg">{loading ? 'Loading ...' : 'Update'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
