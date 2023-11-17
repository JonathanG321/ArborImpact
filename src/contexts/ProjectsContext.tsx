import { createContext, PropsWithChildren, useState } from 'react';
import { Alert } from 'react-native';
import { ProjectWithDonations } from '../../lib/types';
import { createProjectObjectsWithDonations } from '../../lib/utils';
import Queries from '../../lib/supabaseQueries';

export const ProjectsContext = createContext<{
  projects: ProjectWithDonations[] | null;
  setProjects: (projects: ProjectWithDonations[] | null) => void;
  getProjects: () => Promise<void>;
}>({
  projects: null,
  setProjects: () => undefined,
  getProjects: () => Promise.resolve<void>(undefined),
});
export function ProjectsContextProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<ProjectWithDonations[] | null>(null);

  async function getProjects() {
    try {
      const { error, status, data } = await Queries.getSupabaseProjectsWithDonations();
      if (error && status !== 406) throw error;
      if (error) return;
      const projects = await createProjectObjectsWithDonations(data);
      setProjects(projects);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }

  return <ProjectsContext.Provider value={{ projects, setProjects, getProjects }}>{children}</ProjectsContext.Provider>;
}
