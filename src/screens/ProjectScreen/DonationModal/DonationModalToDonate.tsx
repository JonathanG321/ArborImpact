import { useContext, useState } from 'react';
import { View, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import ButtonDisplay from '../../../components/ButtonDisplay';
import { ProjectWithDonationsAndSpendingReport } from '../../../../lib/types';
import LineBreak from '../../../components/LineBreak';
import FormattedInput from '../../../components/FormattedInput';
import Queries from '../../../../lib/supabaseQueries';
import { UserContext } from '../../../contexts/UserContext';
import { cn } from '../../../../lib/utils';

type Props = {
  project: ProjectWithDonationsAndSpendingReport;
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
    if (donation === 0) {
      Alert.alert("You can't donate nothing :(", 'You must input a value greater than 0 in order to donate.');
      return;
    }

    setIsDonating(true);

    const { error, currentBalance } = await Queries.getCurrentBalance(session.user.id);
    if (error) {
      setIsDonating(false);
      Alert.alert('Failed to check current balance', 'Please wait a few minutes and try again.');
      return;
    } else if (currentBalance < donation) {
      setIsDonating(false);
      Alert.alert(
        'You do not have enough money in your account',
        'Please recharge your account or input a smaller donation.'
      );
      return;
    }
    const { error: donationError } = await Queries.makeSupabaseDonation(session.user.id, project.id, donation);
    if (donationError) {
      setIsDonating(false);
      Alert.alert('Failed to donate', donationError.message);
      return;
    }
    if (!profile?.madeFirstDonation) {
      const { error: madeDonationError } = await Queries.setMadeFirstDonation(session.user.id);
      if (madeDonationError) {
        setIsDonating(false);
        Alert.alert('Failed to update has donated flag', madeDonationError.message);
        return;
      }
    }
    if (profile) setProfile({ ...profile, balance: currentBalance - donation, madeFirstDonation: true });
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
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isModalVisible}
    >
      <View className="bg-arbor-bg w-11/12 rounded-2xl flex justify-between items-center p-6">
        <View className="flex items-center w-full">
          <Text className="text-2xl font-extrabold mb-3">{project.name.toUpperCase()}</Text>
          <LineBreak classNames="border-gray-400 mb-6" />
          <View className="shadow py-5 px-7 w-full bg-white flex flex-row flex-wrap justify-center mb-5">
            <Text className="font-bold text-lg text-center">I would like to donate</Text>
            <FormattedInput
              value={donation}
              setValue={(newValue) => {
                const totalDonated = project.donations.reduce((total, donation) => total + donation.donation, 0);
                const remainingFunding = project.fundingGoal - totalDonated;
                const newDonation = parseFloat(newValue.toString()) > remainingFunding ? remainingFunding : newValue;
                setDonation(newDonation);
              }}
            />
            <Text className="font-bold text-lg text-center">
              {project.donationCurrency} to {project.name}. Contributing {Math.floor(impactShares)}% of the funding goal
              of ${project.fundingGoal.toLocaleString()} {project.donationCurrency}, receiving{' '}
              {Math.floor(impactShares)} impact share{Math.floor(impactShares) === 1 ? '' : 's'}.
            </Text>
          </View>
        </View>
        <View className="flex flex-row">
          <ButtonDisplay
            textClassNames="text-lg text-white font-bold"
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
