import { createContext, PropsWithChildren, useState } from 'react';
import { Profile } from '../../lib/types';
import { emptyProfile } from '../../lib/templates';

export const ProfileSetupContext = createContext<{
  profileSetup: Profile | null;
  setProfileSetup: (profileSetup: Profile) => void;
}>({
  profileSetup: null,
  setProfileSetup: () => undefined,
});

export function ProfileSetupContextProvider({ children }: PropsWithChildren) {
  const [profileSetup, setProfileSetup] = useState<Profile>(emptyProfile);

  return (
    <ProfileSetupContext.Provider value={{ profileSetup, setProfileSetup }}>{children}</ProfileSetupContext.Provider>
  );
}
