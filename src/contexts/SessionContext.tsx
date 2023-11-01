import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';

export const SessionContext = createContext<{ session: Session | null; setSession: (session: Session) => void }>({
  session: null,
  setSession: () => undefined,
});
export function SessionContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
}
