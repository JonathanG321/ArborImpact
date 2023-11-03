import { useState, useContext } from 'react';
import { supabase } from '../../supabase/supabase';
import { Text, View, Alert, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import { ProfileContext } from '../contexts/ProfileContext';
import ScreenContainer from '../components/ScreenContainer';
import { SessionContext } from '../contexts/SessionContext';
import Avatar from '../components/Avatar';
import { downloadImage } from '../../lib/utils';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile', 'Main'>;

export default function ProfileScreen({ navigation: { replace } }: Props) {
  const { setIsLoading } = useContext(LoadingContext);
  const { setProfile, profile } = useContext(ProfileContext);
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
      <View>
        <Avatar className="w-32 h-32" image={profile?.avatarImage} />
      </View>
      <View className="mt-5 py-1 self-stretch">
        <Input label="Email" value={session?.user?.email} disabled />
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
