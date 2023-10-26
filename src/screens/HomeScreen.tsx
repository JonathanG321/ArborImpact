import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabase';
import { Text, View, Alert, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'Main'>;

export default function HomeScreen({
  route: {
    params: { session },
  },
}: Props) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }: { username: string; avatar_url: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="p-3 mt-10">
      <View className="mt-5 py-1 self-stretch">
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View className="py-1 self-stretch">
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
          disabled={loading}
        >
          <Text className="text-white text-lg">{loading ? 'Loading ...' : 'Update'}</Text>
        </Pressable>
      </View>
      <View className="py-1 self-stretch">
        <Pressable
          className="flex items-center rounded bg-blue-500 active:bg-blue-600 px-2 py-1"
          onPress={() => supabase.auth.signOut()}
        >
          <Text className="text-white text-lg">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}
