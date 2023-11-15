import { NavigatorScreenParams } from '@react-navigation/native';
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
  'Profile Setup 1': undefined;
  'Profile Setup 2': undefined;
  'Profile Setup 3': undefined;
  'Sign In': undefined;
  'Sign Up': undefined;
  Main: NavigatorScreenParams<RootDrawerParamList>;
};

export type RootDrawerParamList = {
  Home: undefined;
  Profile: { startTab: 0 | 1 };
  Projects: undefined;
  Project: { project: Project };
};

export type SDG =
  | 'SDG1'
  | 'SDG2'
  | 'SDG3'
  | 'SDG4'
  | 'SDG5'
  | 'SDG6'
  | 'SDG7'
  | 'SDG8'
  | 'SDG9'
  | 'SDG10'
  | 'SDG11'
  | 'SDG12'
  | 'SDG13'
  | 'SDG14'
  | 'SDG15'
  | 'SDG16'
  | 'SDG17';

export type Profile = {
  firstName: string;
  lastName: string;
  birthDate: string;
  location: string;
  avatarImage: ImagePickerAsset | null;
  wantDifferenceWorld: boolean;
  wantDiversifyPortfolio: boolean;
  wantTaxIncentives: boolean;
  wantSpecificCause: boolean;
  sdg: SDG[];
  projects: Project[];
};

export type DBProfile = {
  first_name: string;
  last_name: string;
  birth_date: string;
  location: string;
  avatar_url: string;
  want_difference_world: boolean;
  want_diversify_portfolio: boolean;
  want_tax_incentives: boolean;
  want_specific_cause: boolean;
  sdg: SDG[];
  donation_currency: string;
  projects: DBProject[];
};

export type Project = {
  id: number;
  createdAt: string;
  name: string;
  projectImage: ImagePickerAsset | null;
  region: string;
  impactGoal: number;
  impactGoalUnit: string;
  activity: string;
  impactType: string;
  fundingGoal: number;
  goalDate: string;
  sdg: SDG;
  donationCurrency: string;
  donations: Donation[];
  extraImages: ImagePickerAsset[] | null;
};

export type DBProject = {
  id: number;
  created_at: string;
  name: string;
  project_image_url: string;
  region: string;
  impact_goal: number;
  impact_goal_unit: string;
  activity: string;
  impact_type: string;
  funding_goal: number;
  goal_date: string;
  sdg: SDG;
  donations: DBDonation[];
  donation_currency: string;
  extra_images: string[];
};

export type DBDonation = {
  donation: number;
  created_at: string;
  updated_at: string;
  profile_id: string;
  project_id: string;
};
export type Donation = {
  donation: number;
  createdAt: string;
  updatedAt: string;
  profileId: string;
  projectId: string;
};
