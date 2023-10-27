import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  Home: { session: Session };
  'Profile Setup 1': undefined;
  'Profile Setup 2': {
    firstName: string;
    lastName: string;
    birthDate: Date;
    location: string;
    wantDifferenceWorld: boolean;
    wantDiversifyPortfolio: boolean;
    wantTaxIncentives: boolean;
    wantSpecificCause: boolean;
  };
  'Sign In': undefined;
  'Sign Up': undefined;
};
