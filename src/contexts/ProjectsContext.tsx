import { createContext, PropsWithChildren, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { Alert } from 'react-native';
import { DBProject, Project } from '../../lib/types';
import { createProjectObject } from '../../lib/utils';

export const ProjectsContext = createContext<{
  projects: Project[] | null;
  setProjects: (projects: Project[] | null) => void;
  getProjects: () => Promise<void>;
}>({
  projects: null,
  setProjects: () => undefined,
  getProjects: () => Promise.resolve<void>(undefined),
});
export function ProjectsContextProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<Project[] | null>(null);

  async function getProjects() {
    try {
      const { error, status, data } = await supabase
        .from('projects')
        .select(`*, donations(*)`)
        .order('created_at', { foreignTable: 'donations', ascending: false });
      if (error && status !== 406) throw error;
      if (error) return;
      const projects = await createProjectObject(data);
      setProjects(projects);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }

  return <ProjectsContext.Provider value={{ projects, setProjects, getProjects }}>{children}</ProjectsContext.Provider>;
}
