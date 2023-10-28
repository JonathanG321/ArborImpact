import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  Home: { session: Session };
  'Profile Setup 1': undefined;
  'Profile Setup 2': undefined;
  'Sign In': undefined;
  'Sign Up': undefined;
};

export type Profile = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  location: string;
  wantDifferenceWorld: boolean;
  wantDiversifyPortfolio: boolean;
  wantTaxIncentives: boolean;
  wantSpecificCause: boolean;
  svg: string[];
};

export const emptyProfile = {
  birthDate: new Date(),
  firstName: '',
  lastName: '',
  location: '',
  wantDifferenceWorld: false,
  wantDiversifyPortfolio: false,
  wantSpecificCause: false,
  wantTaxIncentives: false,
  svg: [],
};
