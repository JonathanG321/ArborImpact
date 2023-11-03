import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { LoadingContext } from './LoadingContext';
import { Alert } from 'react-native';
import { Profile } from '../../lib/types';

export const ProfileContext = createContext<{
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  getProfile: (session: Session | null) => void;
}>({
  profile: null,
  setProfile: () => undefined,
  getProfile: () => undefined,
});
export function ProfileContextProvider({ children }: PropsWithChildren) {
  const { setIsLoading } = useContext(LoadingContext);
  const [profile, setProfile] = useState<Profile | null>(null);

  async function getProfile(session: Session | null) {
    try {
      setIsLoading(true);
      if (session && !session?.user) throw new Error('No user on the session!');
      const { error, status, data } = await supabase.from('profiles').select(`*`).eq('id', session?.user.id).single();
      if (error && status !== 406) throw error;
      if (error) return;
      setProfile(data as Profile);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <ProfileContext.Provider value={{ profile, setProfile, getProfile }}>{children}</ProfileContext.Provider>;
}
