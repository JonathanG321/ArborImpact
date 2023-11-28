import { ProjectWithDonationsAndSpendingReport } from '../../../../lib/types';
import DonationModalDonated from './DonationModalDonated';
import DonationModalToDonate from './DonationModalToDonate';
import { useState } from 'react';
import { View } from 'react-native';
import ButtonDisplay from '../../../components/ButtonDisplay';

interface DonationModalProps {
  project: ProjectWithDonationsAndSpendingReport;
}

export default function DonationModal({ project }: DonationModalProps) {
  const [donation, setDonation] = useState(0);
  const [donated, setDonated] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const passProps = {
    isModalVisible,
    setIsModalVisible,
    donation,
    setDonation,
    project,
    projectName: project.name,
    setDonated,
  };

  return (
    <>
      <View className="w-full flex flex-row my-6">
        <ButtonDisplay
          onPress={() => setIsModalVisible(true)}
          text="Donate!"
          classNames="mx-4 bg-arbor-blue"
          textClassNames="font-bold text-white"
        />
      </View>
      {donated ? <DonationModalDonated {...passProps} /> : <DonationModalToDonate {...passProps} />}
    </>
  );
}
