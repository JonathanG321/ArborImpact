import { useContext, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootDrawerParamList } from '../../lib/types';
import { ProjectsContext } from '../contexts/ProjectsContext';
import ScreenContainer from '../components/ScreenContainer';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Projects', 'Main'>;

export default function ProjectScreen({ navigation: { replace } }: Props) {
  const { projects, getProjects } = useContext(ProjectsContext);

  useEffect(() => {
    getProjects();
  }, []);

  return <ScreenContainer></ScreenContainer>;
}
