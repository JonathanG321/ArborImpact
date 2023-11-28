import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { ProjectWithDonationsAndSpendingReport } from '../../../lib/types';
import { dayMilliseconds } from '../../../lib/templates';

type Props = {
  project: ProjectWithDonationsAndSpendingReport;
};

export default function ProjectStats({ project }: Props) {
  return (
    <View className="w-full px-4">
      <Text className="text-2xl text-blue-500 mb-1">
        {project.donationCurrency} $
        {project.donations.reduce((total, current) => total + current.donation, 0).toFixed(2)}
      </Text>
      <Text className="text-md font-extrabold mb-4">
        PLEDGED OF {project.donationCurrency} ${project.fundingGoal.toLocaleString()}
      </Text>
      <Text className="text-2xl font-extrabold mb-1">
        {[...new Map(project.donations.map((donation) => [donation.profileId, donation])).values()].length}
      </Text>
      <Text className="text-md font-extrabold mb-4">PROJECT FUNDERS</Text>
      <Text className="text-2xl font-extrabold mb-1">
        {((new Date(project.goalDate).getTime() - new Date().getTime()) / dayMilliseconds).toFixed(0)}
      </Text>
      <Text className="text-md font-extrabold mb-4">DAYS TO GO</Text>
    </View>
  );
}
