import { createContext, PropsWithChildren, useState } from 'react';
import { Alert } from 'react-native';
import { ProjectWithDonationsAndSpendingReport, SDG } from '../../lib/types';
import { createProjectObjectsWithDonations } from '../../lib/utils';
import Queries from '../../lib/supabaseQueries';

export const ProjectsContext = createContext<{
  projects: ProjectWithDonationsAndSpendingReport[] | null;
  setProjects: (projects: ProjectWithDonationsAndSpendingReport[] | null) => void;
  getProjects: () => Promise<void>;
}>({
  projects: null,
  setProjects: () => undefined,
  getProjects: () => Promise.resolve<void>(undefined),
});
export function ProjectsContextProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<ProjectWithDonationsAndSpendingReport[] | null>(null);

  async function getProjects() {
    try {
      const { error, status, data } = await Queries.getSupabaseProjectsWithDonationsAndSpendingReport();
      if (error && status !== 406) throw error;
      if (error) return;
      const projects = await createProjectObjectsWithDonations(
        data.map((project) => ({
          ...project,
          sdg: project.sdgs?.id as SDG,
          spending_report: project.spending_reports,
        }))
      );
      setProjects(projects);
    } catch (error) {
      if (error instanceof Error) Alert.alert(error.message);
    }
  }

  return <ProjectsContext.Provider value={{ projects, setProjects, getProjects }}>{children}</ProjectsContext.Provider>;
}
