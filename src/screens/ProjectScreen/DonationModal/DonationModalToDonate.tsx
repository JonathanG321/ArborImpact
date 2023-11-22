import { View } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import ButtonDisplay from '../../../components/ButtonDisplay';
import { ProjectWithDonations } from '../../../../lib/types';
import LineBreak from '../../../components/LineBreak';
import FormattedInput from '../../../components/FormattedInput';

type Props = {
  project: ProjectWithDonations;
  isModalVisible: boolean;
  donation: number;
  setDonation: React.Dispatch<React.SetStateAction<number>>;
  setDonated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDonation: () => Promise<void>;
};

export default function DonationModalToDonate({
  project,
  isModalVisible,
  donation,
  setDonated,
  setIsModalVisible,
  setDonation,
  handleDonation,
}: Props) {
  const impactShares = (donation / project.fundingGoal) * 100;
  return (
    <Modal
      className="flex items-center"
      onBackdropPress={() => {
        setIsModalVisible(false);
        setDonated(false);
      }}
      isVisible={isModalVisible}
    >
      <View className="bg-arbor-bg h-4/6 w-11/12 rounded-2xl flex justify-between items-center p-6">
        <View className="flex items-center w-full">
          <Text className="text-2xl font-extrabold mb-3">{project.name.toUpperCase()}</Text>
          <LineBreak classNames="border-gray-400 mb-16" />
          <View className="shadow py-5 px-7 w-full bg-white flex flex-row flex-wrap justify-center">
            <Text className="font-bold text-lg text-center">I would like to donate</Text>
            <FormattedInput
              donation={donation}
              setDonation={(newValue) => {
                const totalDonated = project.donations.reduce((total, donation) => total + donation.donation, 0);
                const remainingFunding = project.fundingGoal - totalDonated;
                const newDonation = parseFloat(newValue.toString()) > remainingFunding ? remainingFunding : newValue;
                setDonation(newDonation);
              }}
            />
            <Text className="font-bold text-lg text-center">
              {project.donationCurrency} to {project.name}. Contributing {impactShares.toFixed(0)}% of the funding goal
              of ${project.fundingGoal.toLocaleString()} {project.donationCurrency}, receiving{' '}
              {Math.floor(impactShares)} impact share{Math.floor(impactShares) === 1 ? '' : 's'}.
            </Text>
          </View>
        </View>
        <View className="flex flex-row mb-6">
          <ButtonDisplay
            textClassNames="text-xl text-white font-bold"
            classNames="bg-arbor-blue"
            text="COMPLETE TRANSACTION"
            onPress={async () => await handleDonation()}
          />
        </View>
      </View>
    </Modal>
  );
}
