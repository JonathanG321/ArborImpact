import { Session } from '@supabase/supabase-js';
import { ImagePickerAsset } from 'expo-image-picker';
import { Control, FieldValues, Path } from 'react-hook-form';

export type FormSwitchProps<T extends FieldValues> = {
  control: Control<T> | undefined;
  field: Path<T>;
  description: string;
  icon: string;
  type?: string;
};

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  'Profile Setup 1': undefined;
  'Profile Setup 2': undefined;
  'Profile Setup 3': undefined;
  'Sign In': undefined;
  'Sign Up': undefined;
};

export type Profile = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  location: string;
  avatarImage: ImagePickerAsset | null;
  wantDifferenceWorld: boolean;
  wantDiversifyPortfolio: boolean;
  wantTaxIncentives: boolean;
  wantSpecificCause: boolean;
  sdg: string[];
};

export type DBProfile = {
  first_name: string;
  last_name: string;
  birth_date: Date;
  location: string;
  avatar_url: string;
  want_difference_world: boolean;
  want_diversify_portfolio: boolean;
  want_tax_incentives: boolean;
  want_specific_cause: boolean;
  sdg: string[];
};
