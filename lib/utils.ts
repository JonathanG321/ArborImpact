import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';
import { supabase } from '../supabase/supabase';
import { DBProject, Project } from './types';

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
  const projectImages = await Promise.all(
    dbProjects.map((project) => downloadImage(project.project_image_url, 'project_images'))
  );
  const projects = dbProjects.map(
    ({ created_at, project_image_url, ...rest }, index) =>
      ({
        createdAt: new Date(created_at),
        projectImage: projectImages[index] ? { uri: projectImages[index], width: 200, height: 200 } : null,
        ...rest,
      } as Project)
  );
  return projects;
}
