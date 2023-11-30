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

export type SetupSwitchProps<T extends FieldValues> = {
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
  Project: { project: ProjectWithDonationsAndSpendingReport };
  Marketplace: undefined;
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
  id: string;
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
  projects: ProjectWithDonationsAndSpendingReport[];
  donations: DonationWithProject[];
  requestingFunds: boolean;
  seenMarketplace: boolean;
  madeFirstDonation: boolean;
  balance: number;
};

export type DBProfile = Database['public']['Tables']['profiles']['Row'];
export type DBProfileWithSDGs = DBProfile & {
  SDGs: SDG[];
};
export type DBProfileWithProjectsAndDonations = DBProfileWithSDGs & {
  projects: DBProjectWithDonationsAndSpendingReport[];
  donations: DBDonationWithProject[];
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
  extraImages: ImagePickerAsset[] | null;
};
export type ProjectWithDonationsAndSpendingReport = Project & {
  donations: Donation[];
  spendingReport: SpendingReport;
};

export type DBProject = Database['public']['Tables']['projects']['Row'];
export type DBProjectWithSDG = DBProject & {
  sdg: SDG;
};
export type DBProjectWithDonationsAndSpendingReport = DBProjectWithSDG & {
  donations: DBDonation[];
  spending_report: DBSpendingReport;
};

export type DBSpendingReport = Database['public']['Tables']['spending_reports']['Row'][];
export type SpendingReport = Omit<DBSpendingReport, 'created_at' | 'project_id'> & {
  createdAt: string;
  projectId: number;
};

export type DBDonation = Database['public']['Tables']['donations']['Row'];
export type DBDonationWithProject = DBDonation & {
  project: DBProjectWithSDG;
};

export type Donation = {
  donation: number;
  createdAt: string;
  profileId: string;
  projectId: number;
};

export type DonationWithProject = Donation & {
  project: Project;
};

export type DBProduct = Database['public']['Tables']['products']['Row'];
export type Product = {
  createdAt: string;
  description: string;
  discount: number;
  id: number;
  image: ImagePickerAsset | null;
  name: string;
  sdg: SDG;
};
