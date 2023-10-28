import { createContext, PropsWithChildren, useState } from 'react';
import { emptyProfile, Profile } from '../../lib/utils';

export const ProfileSetupContext = createContext<{ profile: Profile | null; setProfile: (profile: Profile) => void }>({
  profile: null,
  setProfile: () => undefined,
});

export function ProfileSetupContextProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  return <ProfileSetupContext.Provider value={{ profile, setProfile }}>{children}</ProfileSetupContext.Provider>;
}
