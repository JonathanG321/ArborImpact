import { ImagePickerAsset } from 'expo-image-picker';
import { Control, FieldValues, Path } from 'react-hook-form';

export type WantsItemProps = {
  description: string;
  icon: string;
  type?: string;
  descriptionClassName?: string;
  iconSize?: number;
  iconColor?: string;
};

export type FormSwitchProps<T extends FieldValues> = {
  control: Control<T> | undefined;
  field: Path<T>;
} & WantsItemProps;

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Projects: undefined;
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
  projects: Project[];
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
  projects: DBProject[];
};

export type Project = {
  id: number;
  createdAt: Date;
  name: string;
  projectImage: ImagePickerAsset | null;
};

export type DBProject = {
  id: number;
  created_at: string;
  name: string;
  project_image_url: string;
};
