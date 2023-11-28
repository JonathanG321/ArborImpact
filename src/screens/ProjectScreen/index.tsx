import { Text } from 'react-native-elements';
import { View } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../../lib/types';
import ScreenContainer from '../../components/ScreenContainer';
import LineBreak from '../../components/LineBreak';
import { SDGs } from '../../../lib/templates';
import DonationModal from './DonationModal';
import Avatar from '../../components/Avatar';
import SpendingReport from './SpendingReport';
import ProjectInfo from './ProjectInfo';
import ProjectStats from './ProjectStats';

type Props = DrawerScreenProps<RootDrawerParamList, 'Project'>;

export default function ProjectScreen({
  route: {
    params: { project },
  },
}: Props) {
  const extraImages = project.extraImages || [];
  const projectImages = project.projectImage ? [project.projectImage].concat(extraImages) : extraImages;

  return (
    <ScreenContainer scrollable>
      <View className="flex items-center flex-1 pb-16">
        <View className="flex flex-row items-center mb-4">
          <Text className="text-2xl font-extrabold">{project.name.toLocaleUpperCase()}</Text>
          <Avatar image={SDGs[project.sdg]} accessibilityLabel="SDG" classNames="w-10 h-10 rounded-lg ml-3" />
        </View>
        <LineBreak />
        <ProjectInfo project={project} />
        <LineBreak />
        <SpendingReport project={project} />
        <Text className="text-xl font-extrabold mb-4">FUNDING GOAL AND PROGRESS</Text>
        <LineBreak />
        <ProjectStats project={project} />
        <DonationModal project={project} />
        <Text className="text-xl font-extrabold mb-4">IMAGE GALLERY</Text>
        <LineBreak />
        <View className="flex flex-row flex-wrap justify-center">
          {projectImages.map((image, i) => (
            <Avatar
              key={image.uri + i}
              image={image}
              accessibilityLabel="Project Image"
              classNames="w-24 h-24 rounded-md m-3"
            />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}
