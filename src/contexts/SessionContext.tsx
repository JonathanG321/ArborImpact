import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { LoadingContext } from './LoadingContext';

export const SessionContext = createContext<{ session: Session | null; setSession: (session: Session) => void }>({
  session: null,
  setSession: () => undefined,
});
export function SessionContextProvider({ children }: PropsWithChildren) {
  const { setIsLoading } = useContext(LoadingContext);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setIsLoading(false);
  }, []);

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
}
