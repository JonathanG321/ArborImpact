import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  Home: { session: Session };
  'Profile Setup 1': undefined;
  'Profile Setup 2': {
    first_name: string;
    last_name: string;
    birth_date: Date;
    location: string;
    want_difference_world: boolean;
    want_diversify_portfolio: boolean;
    want_tax_incentives: boolean;
    want_specific_cause: boolean;
  };
  'Sign In': undefined;
  'Sign Up': undefined;
};
