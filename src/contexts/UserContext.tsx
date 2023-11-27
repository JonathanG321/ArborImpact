import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Queries from '../../lib/supabaseQueries';
import { DBProject, DonationWithProject, Profile } from '../../lib/types';
import { createProjectObjects, createProjectObjectsWithDonations, downloadImage } from '../../lib/utils';
import { Alert } from 'react-native';
import { LoadingContext } from './LoadingContext';
import { supabase } from '../../supabase/supabase';

export const UserContext = createContext<{
  session: Session | null;
  setSession: (session: Session) => void;
  userSetup: () => Promise<void>;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  getProfile: (session: Session | null) => Promise<void | boolean>;
  isFirstLoad: boolean;
}>({
  session: null,
  setSession: () => undefined,
  userSetup: () => Promise.resolve<void>(undefined),
  profile: null,
  setProfile: () => undefined,
  getProfile: () => Promise.resolve<void>(undefined),
  isFirstLoad: true,
});
export function UserContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { setIsLoading } = useContext(LoadingContext);

  async function getProfile(session: Session | null) {
    try {
      if (session && !session?.user) throw new Error('No user on the session!');
      if (!session) {
        return false;
      }
      setIsLoading(true);
      const { error, status, data: dbProfile } = await Queries.getSupabaseProfile(session?.user.id);
      if (error && status !== 406) throw error;
      if (error || !dbProfile) return;
      const [image, projects] = await Promise.all([
        downloadImage(dbProfile.avatar_url),
        createProjectObjectsWithDonations(dbProfile.projects),
      ]);
      const {
        SDGs,
        birth_date,
        first_name,
        last_name,
        made_first_donation,
        requesting_funds,
        seen_marketplace,
        want_difference_world,
        want_diversify_portfolio,
        want_specific_cause,
        want_tax_incentives,
        recharges,
        donations,
        id,
        location,
      } = dbProfile;
      const profile: Profile = {
        id,
        avatarImage: image || null,
        birthDate: birth_date,
        firstName: first_name,
        lastName: last_name,
        balance: recharges.reduce((total, charge) => total + charge.amount, 0),
        sdg: SDGs,
        location,
        wantDifferenceWorld: want_difference_world,
        wantDiversifyPortfolio: want_diversify_portfolio,
        wantSpecificCause: want_specific_cause,
        wantTaxIncentives: want_tax_incentives,
        requestingFunds: requesting_funds,
        seenMarketplace: seen_marketplace,
        madeFirstDonation: made_first_donation,
        projects: projects,
        donations: await Promise.all(
          donations.map(
            async (donation) =>
              ({
                donation: donation.amount,
                createdAt: donation.created_at,
                profileId: donation.profile_id,
                projectId: donation.project_id,
                project: {
                  ...(await createProjectObjects(donation?.project ? [donation.project] : ([] as DBProject[])))[0],
                },
              } as DonationWithProject)
          )
        ),
      };
      setProfile(profile);
      setTimeout(() => {
        setIsLoading(false);
        setIsFirstLoad(false);
      }, 500);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
      setIsLoading(false);
      setIsFirstLoad(false);
    }
  }

  async function userSetup() {
    const session = await Queries.getSupabaseSession(setSession);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      getProfile(session);
    });
    await getProfile(session);
  }

  useEffect(() => {
    userSetup();
  }, []);

  return (
    <UserContext.Provider value={{ session, setSession, userSetup, profile, setProfile, getProfile, isFirstLoad }}>
      {children}
    </UserContext.Provider>
  );
}
