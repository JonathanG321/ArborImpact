import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';
import { supabase } from '../supabase/supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadImage(path: string, setResult: (result: string) => void, bucket: string = 'avatars') {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path);

    if (error) {
      throw error;
    }

    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      setResult(fr.result as string);
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error downloading image: ', error.message);
    }
  }
}
