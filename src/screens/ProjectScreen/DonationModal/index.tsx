import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ProjectWithDonations, RootDrawerParamList } from '../../../../lib/types';
import { FormattedInputProps } from '../../../components/FormattedInput';
import DonationModalDonated from './DonationModalDonated';
import DonationModalToDonate from './DonationModalToDonate';

interface DonationModalProps extends FormattedInputProps {
  donated: boolean;
  setDonated: React.Dispatch<React.SetStateAction<boolean>>;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: DrawerNavigationProp<RootDrawerParamList, 'Project', undefined>;
  project: ProjectWithDonations;
}

export default function DonationModal({
  donation,
  donated,
  setDonated,
  isModalVisible,
  setDonation,
  setIsModalVisible,
  navigation,
  project,
}: DonationModalProps) {
  if (donated) {
    return (
      <DonationModalDonated
        isModalVisible={isModalVisible}
        navigation={navigation}
        projectName={project.name}
        setIsModalVisible={setIsModalVisible}
        setDonated={setDonated}
        setDonation={setDonation}
      />
    );
  }
  return (
    <DonationModalToDonate
      project={project}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      setDonation={setDonation}
      donation={donation}
      setDonated={setDonated}
    />
  );
}
