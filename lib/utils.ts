import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';
import { supabase } from '../supabase/supabase';
import { DBProject, Project, RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

export async function createProjectObject(dbProjects: DBProject[]) {
  const projectMainImages = await Promise.all(
    dbProjects.map((project) => downloadImage(project.project_image_url, 'project_images'))
  );
  const projectExtraImages = await Promise.all(
    dbProjects.map(
      async (project) => await Promise.all(project.extra_images.map((image) => downloadImage(image, 'project_images')))
    )
  );
  const projects = dbProjects.map(
    (
      {
        created_at,
        project_image_url,
        extra_images,
        funding_goal,
        goal_date,
        impact_goal,
        impact_goal_unit,
        impact_type,
        donations,
        donation_currency,
        ...rest
      },
      index
    ) =>
      ({
        createdAt: created_at,
        projectImage: projectMainImages[index] ? { uri: projectMainImages[index], width: 200, height: 200 } : null,
        fundingGoal: funding_goal,
        goalDate: goal_date,
        impactGoal: impact_goal,
        impactGoalUnit: impact_goal_unit,
        impactType: impact_type,
        donationCurrency: donation_currency,
        donations: donations ? donations.map((donation) => donation.donation) : [],
        extraImages: projectExtraImages[index]
          ? projectExtraImages[index].map((image) => ({ uri: image, width: 200, height: 200 }))
          : null,
        ...rest,
      } as Project)
  );
  return projects;
}
