import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  Home: { session: Session };
  SignIn: undefined;
  SignUp: undefined;
};
