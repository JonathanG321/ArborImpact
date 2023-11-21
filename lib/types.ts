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

export type LoginForm = {
  email: string;
  password: string;
};

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
  Project: { project: ProjectWithDonations };
};

export type SDG =
  | 'SDG01'
  | 'SDG02'
  | 'SDG03'
  | 'SDG04'
  | 'SDG05'
  | 'SDG06'
  | 'SDG07'
  | 'SDG08'
  | 'SDG09'
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
  projects: ProjectWithDonations[];
  donations: DonationWithProject[];
  requestingFunds: boolean;
  balance: number;
};

export type DBProfile = Database['public']['Tables']['profiles']['Row'];
export interface DBProfileWithSDGs extends DBProfile {
  SDGs: SDG[];
}
export interface DBProfileWithProjectsAndDonationsAndRecharges extends DBProfileWithSDGs {
  projects: DBProjectWithDonations[];
  donations: DBDonationWithProject[];
  recharges: Database['public']['Tables']['recharges']['Row'][];
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
  extraImages: ImagePickerAsset[] | null;
};
export interface ProjectWithDonations extends Project {
  donations: Donation[];
}

export type DBProject = Database['public']['Tables']['projects']['Row'];
export interface DBProjectWithSDG extends DBProject {
  sdg: SDG;
}
export interface DBProjectWithDonations extends DBProjectWithSDG {
  donations: DBDonation[];
}

export type DBDonation = Database['public']['Tables']['donations']['Row'];
export interface DBDonationWithProject extends DBDonation {
  project: DBProjectWithSDG;
}

export type Donation = {
  donation: number;
  createdAt: string;
  profileId: string;
  projectId: number;
};

export interface DonationWithProject extends Donation {
  project: Project;
}
