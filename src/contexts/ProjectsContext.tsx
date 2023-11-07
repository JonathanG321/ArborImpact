import { Session } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabase';
import { LoadingContext } from './LoadingContext';
import { Alert } from 'react-native';
import { DBProject, Project } from '../../lib/types';
import { createProjectObject, downloadImage } from '../../lib/utils';

export const ProjectsContext = createContext<{
  projects: Project[] | null;
  setProjects: (projects: Project[] | null) => void;
  getProjects: (session: Session | null) => void;
}>({
  projects: null,
  setProjects: () => undefined,
  getProjects: () => undefined,
});
export function ProjectsContextProvider({ children }: PropsWithChildren) {
  const { setIsLoading } = useContext(LoadingContext);
  const [projects, setProjects] = useState<Project[] | null>(null);

  async function getProjects() {
    try {
      setIsLoading(true);
      const { error, status, data } = await supabase.from('projects').select(`*`);
      if (error && status !== 406) throw error;
      if (error) return;
      const projects = await createProjectObject(data as DBProject[]);
      setProjects(projects);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return <ProjectsContext.Provider value={{ projects, setProjects, getProjects }}>{children}</ProjectsContext.Provider>;
}
