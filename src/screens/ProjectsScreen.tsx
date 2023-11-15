import { useContext, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Text } from 'react-native-elements';
import { RootDrawerParamList } from '../../lib/types';
import { ProjectsContext } from '../contexts/ProjectsContext';
import ProjectsCarousel from '../components/ProjectsCarousel';
import LineBreak from '../components/LineBreak';
import { ProfileContext } from '../contexts/ProfileContext';
import { dayMilliseconds } from '../../lib/templates';

type Props = NativeStackScreenProps<RootDrawerParamList, 'Projects', 'Main'>;

export default function ProjectsScreen({ navigation: { replace } }: Props) {
  const { projects, getProjects } = useContext(ProjectsContext);
  const { profile } = useContext(ProfileContext);
  const headerHeight = useHeaderHeight();
  const currentDate = new Date().getTime();

  const newProjects =
    projects?.filter((project) => (currentDate - new Date(project.createdAt).getTime()) / dayMilliseconds < 30) || [];
  const neglectedProjects =
    projects?.filter((project) =>
      !!project.donations.length
        ? (currentDate - new Date(project.donations[0].updatedAt).getTime()) / dayMilliseconds < 7
        : false
    ) || [];

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
      {projects?.length ? (
        <>
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
        </>
      ) : (
        <Text>No Projects</Text>
      )}
    </View>
  );
}
