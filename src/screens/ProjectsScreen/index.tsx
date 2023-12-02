import { useContext, useEffect } from 'react';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { RootDrawerParamList } from '../../../lib/types';
import { ProjectsContext } from '../../contexts/ProjectsContext';
import ProjectsCarousel from './ProjectsCarousel';
import LineBreak from '../../components/LineBreak';
import { dayMilliseconds } from '../../../lib/templates';
import { UserContext } from '../../contexts/UserContext';
import ScreenContainer from '../../components/ScreenContainer';

type Props = DrawerScreenProps<RootDrawerParamList, 'Projects', 'Main'>;

export default function ProjectsScreen({}: Props) {
  const { projects, getProjects } = useContext(ProjectsContext);
  const { profile } = useContext(UserContext);
  const currentDate = new Date().getTime();

  const newProjects =
    projects?.filter((project) => (currentDate - new Date(project.createdAt).getTime()) / dayMilliseconds < 30) || [];
  const neglectedProjects =
    projects?.filter((project) =>
      !!project.donations.length
        ? (currentDate - new Date(project.donations[0].createdAt).getTime()) / dayMilliseconds < 7
        : false
    ) || [];

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ScreenContainer scrollable noPadding>
      {projects?.length ? (
        <View className="mb-16">
          <Text className="text-2xl font-bold w-full text-center my-6">BROWSE PROJECTS</Text>
          <View className="flex flex-row justify-center mb-4">
            <LineBreak classNames="w-1/2 border-gray-400" />
          </View>
          <Text className="text-lg w-full text-center text-gray-700 mb-6">Projects that might interest you:</Text>
          <ProjectsCarousel
            projects={
              projects.length > 10 && profile
                ? projects.filter((project) => profile.sdg.includes(project.sdg))
                : projects
            }
          />
          {!!newProjects.length && (
            <>
              <Text className="text-lg w-full text-center text-gray-700 my-6">Check out what's new and exciting:</Text>
              <ProjectsCarousel projects={newProjects} />
            </>
          )}
          {!!newProjects.length && (
            <>
              <Text className="text-lg w-full text-center text-gray-700 my-6">Projects that need a little love:</Text>
              <ProjectsCarousel projects={neglectedProjects} />
            </>
          )}
        </View>
      ) : (
        <Text>No Projects</Text>
      )}
    </ScreenContainer>
  );
}
