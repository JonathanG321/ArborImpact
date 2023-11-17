import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import Queries from '../../lib/supabaseQueries';

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
    await Queries.getSupabaseSession(setSession);
  }

  useEffect(() => {
    getSession();
  }, []);

  return <SessionContext.Provider value={{ session, setSession, getSession }}>{children}</SessionContext.Provider>;
}
