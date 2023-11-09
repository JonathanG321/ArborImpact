import { useContext, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../../lib/types';
import { ProjectsContext } from '../contexts/ProjectsContext';
import ScreenContainer from '../components/ScreenContainer';
import CarouselTest from '../components/CarouselTest';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Projects', 'Main'>;

export default function ProjectScreen({ navigation: { replace } }: Props) {
  const { projects, getProjects } = useContext(ProjectsContext);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <View style={{ height: Dimensions.get('window').height - headerHeight }}>
      <LinearGradient
        style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
        className="h-full z[-1] absolute"
        colors={['#E5F0FF', '#fff']}
      />
      <CarouselTest />
    </View>
  );
}
