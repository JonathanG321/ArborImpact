import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile Setup 2', 'Main'>;

export default function ProfileSetup2Screen({ navigation: { navigate } }: Props) {
  const [loading, setLoading] = useState(true);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');

  return (
    <View className="p-3 mt-10">
      <View className="py-1 self-stretch">
        <Input label="First Name" value={first_name || ''} onChangeText={(text) => setFirst_name(text)} />
      </View>
      <View className="py-1 self-stretch">
        <Input label="Last Name" value={last_name || ''} onChangeText={(text) => setLast_name(text)} />
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          // onPress={() => updateProfile({ first_name, last_name })}
          disabled={loading}
        >
          <Text className="text-white text-lg">{loading ? 'Loading ...' : 'Update'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
