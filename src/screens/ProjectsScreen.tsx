import { useContext, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../lib/types';
import { LoadingContext } from '../contexts/LoadingContext';
import { ProjectsContext } from '../contexts/ProjectsContext';
import ScreenContainer from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootStackParamList, 'Projects', 'Main'>;

export default function ProjectScreen({ navigation: { replace } }: Props) {
  const { setIsLoading } = useContext(LoadingContext);
  const { setProjects, projects } = useContext(ProjectsContext);

  useEffect(() => {
    setIsLoading(true);

    setIsLoading(false);
  }, []);

  return <ScreenContainer></ScreenContainer>;
}
