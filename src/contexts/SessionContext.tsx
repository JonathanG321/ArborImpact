import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';

export const SessionContext = createContext<{
  session: Session | null;
  setSession: (session: Session) => void;
  getSession: () => Promise<void>;
}>({
  session: null,
  setSession: () => undefined,
  getSession: () => Promise.resolve<void>(undefined),
});
export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  async function getSession() {
    await supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }

  useEffect(() => {
    getSession();
  }, []);

  return <SessionContext.Provider value={{ session, setSession, getSession }}>{children}</SessionContext.Provider>;
}
