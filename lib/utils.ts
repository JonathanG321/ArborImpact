import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';
import { supabase } from '../supabase/supabase';
import { DBProject, DBProjectWithDonations, Donation, Project, ProjectWithDonations } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadImage(path: string, bucket: string = 'avatars') {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);

    if (error) {
      throw error;
    }

    const image = await new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(data);
    });

    return image;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error downloading image: ', error.message);
    }
  }
}

async function getImages(dbProjects: DBProject[]) {
  const projectMainImages = await Promise.all(
    dbProjects.map((project) => downloadImage(project.project_image_url, 'project_images'))
  );
  const projectExtraImages = await Promise.all(
    dbProjects.map(
      async (project) => await Promise.all(project.extra_images.map((image) => downloadImage(image, 'project_images')))
    )
  );
  return { projectMainImages, projectExtraImages };
}

export async function createProjectObjects(dbProjects: DBProject[]) {
  const { projectExtraImages, projectMainImages } = await getImages(dbProjects);
  const projects = dbProjects.map((project, index) =>
    createProject(project, index, projectMainImages, projectExtraImages)
  );
  return projects;
}
export async function createProjectWithDonationObjects(dbProjects: DBProjectWithDonations[]) {
  const { projectExtraImages, projectMainImages } = await getImages(dbProjects);
  const projects = dbProjects.map((project, index) =>
    createProjectWithDonations(project, index, projectMainImages, projectExtraImages)
  );
  return projects;
}

function createProject(
  {
    created_at,
    project_image_url,
    extra_images,
    funding_goal,
    goal_date,
    impact_goal,
    impact_goal_unit,
    impact_type,
    donation_currency,
    ...rest
  }: DBProject,
  index: number,
  projectMainImages: (string | undefined)[],
  projectExtraImages: (string | undefined)[][]
) {
  return {
    createdAt: created_at,
    projectImage: projectMainImages[index] ? { uri: projectMainImages[index], width: 200, height: 200 } : null,
    fundingGoal: funding_goal,
    goalDate: goal_date,
    impactGoal: impact_goal,
    impactGoalUnit: impact_goal_unit,
    impactType: impact_type,
    donationCurrency: donation_currency,
    extraImages: projectExtraImages[index]
      ? projectExtraImages[index].map((image) => ({ uri: image, width: 200, height: 200 }))
      : null,
    ...rest,
  } as Project;
}
function createProjectWithDonations(
  { donations, ...rest }: DBProjectWithDonations,
  index: number,
  projectMainImages: (string | undefined)[],
  projectExtraImages: (string | undefined)[][]
) {
  return {
    ...createProject(rest, index, projectMainImages, projectExtraImages),
    donations: donations.map(
      (donation) =>
        ({
          donation: donation.donation,
          createdAt: donation.created_at,
          profileId: donation.profile_id,
          projectId: donation.project_id,
        } as Donation)
    ),
  } as ProjectWithDonations;
}
