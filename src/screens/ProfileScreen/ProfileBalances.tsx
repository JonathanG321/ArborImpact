import { useContext } from 'react';
import { Alert, View } from 'react-native';
import ButtonDisplay from '../../components/ButtonDisplay';
import { cn } from '../../../lib/utils';
import { DonationWithProject } from '../../../lib/types';
import { UserContext } from '../../contexts/UserContext';
import Queries from '../../../lib/supabaseQueries';

export default function ProfileBalances() {
  const { session, profile, setProfile } = useContext(UserContext);

  const donationsByProject: { [key: string]: DonationWithProject[] } = {};
  if (profile && profile.donations && profile.donations.length) {
    profile.donations.forEach((donation) => {
      if (!donationsByProject[donation.projectId]) {
        donationsByProject[donation.projectId] = [];
      }
      donationsByProject[donation.projectId].push(donation);
    });
  }

  const shares = Object.keys(donationsByProject)
    .map((projectKey) => {
      const totalDonation = donationsByProject[projectKey].reduce((total, donation) => total + donation.donation, 0);
      return (totalDonation / donationsByProject[projectKey][0].project.fundingGoal) * 100;
    })
    .reduce((total, currentShares) => total + currentShares, 0);

  return (
    <View className="my-2 flex flex-row justify-around mb-4">
      {profile && profile.balance > 0 ? (
        <ButtonDisplay text={`Balance: USD $${profile?.balance.toFixed(2)}`} classNames="ml-4 mr-2" />
      ) : (
        <ButtonDisplay
          onPress={
            profile?.requestingFunds
              ? undefined
              : async () => {
                  const res = await Queries.requestFunds(session?.user.id);
                  if (res && res.error) {
                    Alert.alert(res.error.message);
                    return;
                  } else if (!profile) {
                    Alert.alert('No Profile Found');
                    return;
                  }
                  setProfile({ ...profile, requestingFunds: true });
                }
          }
          text={profile?.requestingFunds ? 'Refill Requested' : 'Request refill'}
          classNames={cn('ml-4 mr-2', {
            'bg-green-500': profile?.requestingFunds,
            'bg-red-500': !profile?.requestingFunds,
          })}
        />
      )}
      <ButtonDisplay
        text={`Shares: ${Math.floor(shares)}`}
        classNames="bg-arbor-blue ml-2 mr-4"
        textClassNames="text-white"
      />
    </View>
  );
}
