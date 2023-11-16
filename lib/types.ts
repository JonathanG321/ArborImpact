import { NavigatorScreenParams } from '@react-navigation/native';
import { ImagePickerAsset } from 'expo-image-picker';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Database } from './supabaseTypes';

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
  balance: number;
};

export type DBProfile = Database['public']['Tables']['profiles']['Row'];
export interface DBProfilesWithProjects extends DBProfile {
  projects: DBProjectsWithDonations;
}

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

export type DBProject = Database['public']['Tables']['projects']['Row'];
export interface DBProjectsWithDonations extends DBProject {
  donations: DBDonation[];
}

export type DBDonation = Database['public']['Tables']['donations']['Row'];
export interface Donation extends Pick<DBDonation, 'donation'> {
  createdAt: string;
  updatedAt: string;
  profileId: string;
  projectId: number;
}
