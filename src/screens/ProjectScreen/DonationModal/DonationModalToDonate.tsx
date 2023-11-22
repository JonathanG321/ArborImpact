import { useContext, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import ButtonDisplay from '../../../components/ButtonDisplay';
import { ProjectWithDonations } from '../../../../lib/types';
import LineBreak from '../../../components/LineBreak';
import FormattedInput from '../../../components/FormattedInput';
import Queries from '../../../../lib/supabaseQueries';
import { UserContext } from '../../../contexts/UserContext';
import { cn } from '../../../../lib/utils';

type Props = {
  project: ProjectWithDonations;
  isModalVisible: boolean;
  donation: number;
  setDonation: React.Dispatch<React.SetStateAction<number>>;
  setDonated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DonationModalToDonate({
  project,
  isModalVisible,
  donation,
  setDonated,
  setIsModalVisible,
  setDonation,
}: Props) {
  const { session, setProfile, profile } = useContext(UserContext);
  const [isDonating, setIsDonating] = useState(false);
  const impactShares = (donation / project.fundingGoal) * 100;

  async function handleDonation() {
    if (!session) throw new Error('Session does not exist when donation button is pressed');

    setIsDonating(true);

    const { error, currentBalance } = await Queries.getCurrentBalance(session.user.id);
    if (error) {
      setIsDonating(false);
      Alert.alert('Failed to check current balance. Please wait a few minutes and try again.');
      return;
    } else if (currentBalance < donation) {
      setIsDonating(false);
      Alert.alert('You do not have enough money in your account to donate that much.');
      return;
    }
    const { error: donationError } = await Queries.makeSupabaseDonation(session.user.id, project.id, donation);
    if (donationError) {
      setIsDonating(false);
      Alert.alert(donationError.message);
      return;
    }
    if (profile) setProfile({ ...profile, balance: currentBalance - donation });
    setIsDonating(false);
    setDonated(true);
  }

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
            classNames={cn('bg-arbor-blue', { 'bg-gray-400': isDonating })}
            disabled={isDonating}
            text={!isDonating ? 'COMPLETE TRANSACTION' : 'Loading...'}
            onPress={!isDonating ? async () => await handleDonation() : undefined}
          />
        </View>
      </View>
    </Modal>
  );
}
