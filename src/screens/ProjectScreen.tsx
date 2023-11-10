import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../../lib/types';
import { ProjectsContext } from '../contexts/ProjectsContext';
import ProjectsCarousel from '../components/ProjectsCarousel';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Text } from 'react-native-elements';
import ScreenContainer from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Project'>;

export default function ProjectScreen({
  navigation: { navigate },
  route: {
    params: { project },
  },
}: Props) {
  const headerHeight = useHeaderHeight();

  return (
    <ScreenContainer>
      <Text>{project.name}</Text>
    </ScreenContainer>
  );
}
