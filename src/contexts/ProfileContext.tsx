import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { LoadingContext } from './LoadingContext';
import { Alert } from 'react-native';
import { DBProfile, Profile } from '../../lib/types';
import { downloadImage } from '../../lib/utils';

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
  const [newImage, setNewImage] = useState<string | null>(null);

  async function getProfile(session: Session | null) {
    try {
      setIsLoading(true);
      if (session && !session?.user) throw new Error('No user on the session!');
      const { error, status, data } = await supabase.from('profiles').select(`*`).eq('id', session?.user.id).single();
      if (error && status !== 406) throw error;
      if (error) return;
      const dbProfile = data as DBProfile;
      await downloadImage((data as DBProfile).avatar_url, setNewImage);
      const profile: Profile = {
        avatarImage: newImage ? { uri: newImage, width: 200, height: 200 } : null,
        birthDate: dbProfile.birth_date,
        firstName: dbProfile.first_name,
        lastName: dbProfile.last_name,
        location: dbProfile.location,
        sdg: dbProfile.sdg,
        wantDifferenceWorld: dbProfile.want_difference_world,
        wantDiversifyPortfolio: dbProfile.want_diversify_portfolio,
        wantSpecificCause: dbProfile.want_specific_cause,
        wantTaxIncentives: dbProfile.want_tax_incentives,
      };
      setProfile(profile);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <ProfileContext.Provider value={{ profile, setProfile, getProfile }}>{children}</ProfileContext.Provider>;
}
