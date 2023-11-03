import { Session } from '@supabase/supabase-js';
import { ImagePickerAsset } from 'expo-image-picker';
import { Control, FieldValues, Path } from 'react-hook-form';

export type FormSwitchProps<T extends FieldValues> = {
  control: Control<T> | undefined;
  field: Path<T>;
  description: string;
};

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
  avatarImage: ImagePickerAsset | null;
  wantDifferenceWorld: boolean;
  wantDiversifyPortfolio: boolean;
  wantTaxIncentives: boolean;
  wantSpecificCause: boolean;
  sdg: string[];
};
