import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { Alert } from 'react-native';
import { Profile, SDG } from '../../lib/types';
import { createProjectObject, downloadImage } from '../../lib/utils';

export const ProfileContext = createContext<{
  profile: Profile | null;
  isLoadingProfile: boolean;
  setProfile: (profile: Profile | null) => void;
  getProfile: (session: Session | null) => Promise<void | boolean>;
}>({
  profile: null,
  isLoadingProfile: false,
  setProfile: () => undefined,
  getProfile: () => Promise.resolve<void>(undefined),
});
export function ProfileContextProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  async function getProfile(session: Session | null) {
    try {
      if (session && !session?.user) throw new Error('No user on the session!');
      if (!session) {
        return false;
      }
      setIsLoadingProfile(true);
      const {
        error,
        status,
        data: dbProfile,
      } = await supabase.from('profiles').select(`*, projects(*, donations(*))`).eq('id', session?.user.id).single();
      if (error && status !== 406) throw error;
      if (error) return;
      const [image, projects] = await Promise.all([
        downloadImage(dbProfile.avatar_url),
        createProjectObject(dbProfile.projects),
      ]);
      const profile: Profile = {
        avatarImage: image ? { uri: image, width: 200, height: 200 } : null,
        birthDate: dbProfile.birth_date,
        firstName: dbProfile.first_name,
        lastName: dbProfile.last_name,
        location: dbProfile.location,
        sdg: dbProfile.sdg as SDG[],
        wantDifferenceWorld: dbProfile.want_difference_world,
        wantDiversifyPortfolio: dbProfile.want_diversify_portfolio,
        wantSpecificCause: dbProfile.want_specific_cause,
        wantTaxIncentives: dbProfile.want_tax_incentives,
        projects: projects,
        balance: dbProfile.balance,
      };
      setProfile(profile);
      setIsLoadingProfile(false);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
      setIsLoadingProfile(false);
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, getProfile, isLoadingProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
