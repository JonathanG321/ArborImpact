import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { ProjectWithDonationsAndSpendingReport } from '../../../lib/types';

type Props = {
  project: ProjectWithDonationsAndSpendingReport;
};

export default function ProjectInfo({ project }: Props) {
  return (
    <View className="w-full px-4">
      <Text className="text-2xl font-extrabold mb-4">
        REGION: <Text className="font-normal text-lg">{project.region}</Text>
      </Text>
      <Text className="text-2xl font-extrabold mb-4">
        IMPACT GOAL:{' '}
        <Text className="font-normal text-lg">
          {project.impactGoal} {project.impactGoalUnit}
        </Text>
      </Text>
      <Text className="text-2xl font-extrabold mb-4">
        ACTIVITY: <Text className="font-normal text-lg">{project.activity}</Text>
      </Text>
      <Text className="text-2xl font-extrabold mb-4">
        TYPE OF IMPACT: <Text className="font-normal text-lg">{project.impactType}</Text>
      </Text>
    </View>
  );
}
