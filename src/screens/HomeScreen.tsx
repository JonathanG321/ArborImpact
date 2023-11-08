import { useContext, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { Text, View, Alert, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import { ProfileContext } from '../contexts/ProfileContext';
import ScreenContainer from '../components/ScreenContainer';
import { SessionContext } from '../contexts/SessionContext';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Home', 'Main'>;

export default function HomeScreen({ navigation: { replace } }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setIsLoading } = useContext(LoadingContext);
  const { setProfile } = useContext(ProfileContext);
  const { session } = useContext(SessionContext);

  async function updateProfile({ firstName, lastName }: { firstName: string; lastName: string }) {
    try {
      setIsLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { error } = await supabase.from('profiles').upsert({
        id: session?.user.id,
        firstName,
        lastName,
        updated_at: new Date(),
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <View className="mt-5 py-1 self-stretch">
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View className="py-1 self-stretch">
        <Input label="First Name" value={firstName || ''} onChangeText={(text) => setFirstName(text)} />
      </View>
      <View className="py-1 self-stretch">
        <Input label="Last Name" value={lastName || ''} onChangeText={(text) => setLastName(text)} />
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={() => updateProfile({ firstName, lastName })}
        >
          <Text className="text-white text-lg">Update</Text>
        </Pressable>
      </View>
      <View className="py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={async () => {
            setIsLoading(true);
            await supabase.auth.signOut();
            setProfile(null);
            setIsLoading(false);
          }}
        >
          <Text className="text-white text-lg">Sign Out</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
