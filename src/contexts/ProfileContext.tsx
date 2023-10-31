import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { LoadingContext } from './LoadingContext';
import { Alert } from 'react-native';
import { SessionContext } from './SessionContext';
import { Profile } from '../../lib/types';

export const ProfileContext = createContext<{ profile: Profile | null; setProfile: (profile: Profile) => void }>({
  profile: null,
  setProfile: () => undefined,
});
export function ProfileContextProvider({ children }: PropsWithChildren) {
  const { setIsLoading } = useContext(LoadingContext);
  const { session } = useContext(SessionContext);
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

  useEffect(() => {
    getProfile(session); // TODO: Test this
  }, []);

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}
