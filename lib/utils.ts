import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  Home: { session: Session };
  'Sign In': undefined;
  'Sign Up': undefined;
};
