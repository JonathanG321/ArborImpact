import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Badge, Text } from 'react-native-elements';
import * as Progress from 'react-native-progress';
import Avatar from './Avatar';
import { ProjectWithDonations } from '../../lib/types';
import { SDGs } from '../../lib/templates';

type Props = {
  projects: ProjectWithDonations[];
};

export default function MyProjects({ projects }: Props) {
  return (
    <ScrollView className="w-full h-full mt-5">
      {projects.map((project, i) => {
        const amountDonated = project.donations.reduce((total, current) => total + current.donation, 0);
        console.log(project.sdg);
        return (
          <View key={project.name + project.id + project.impactType + i} className="flex-row flex mb-8">
            <View>
              <Avatar classNames="h-32 w-32" image={project.projectImage} accessibilityLabel="Project Image" />
              <Badge
                status="success"
                value={<Avatar classNames="h-10 w-10" image={SDGs[project.sdg]} />}
                containerStyle={{ position: 'absolute', bottom: -3, right: -14 }}
              />
            </View>
            <View className="pl-4 flex-1">
              <Text className="font-extrabold underline text-lg">{project.name.toUpperCase()}</Text>
              <View className="justify-center items-center w-full">
                <Text className="text-lg text-arbor-grey font-medium">
                  {project.donationCurrency}: {amountDonated.toFixed(2)} Collected
                </Text>
                <Progress.Bar
                  borderColor="grey"
                  borderRadius={4}
                  height={12}
                  className="w-full"
                  width={null}
                  progress={amountDonated / project.fundingGoal}
                />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
