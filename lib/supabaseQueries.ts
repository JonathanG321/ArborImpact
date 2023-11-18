import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBProfile, DBProfileWithProjectsAndDonations, LoginForm, Profile } from './types';

export default {
  getSupabaseImage: async (path: string, bucket: string) => {
    return await supabase.storage.from(bucket).download(path);
  },

  getSupabaseSession: async (setSession: (value: React.SetStateAction<Session | null>) => void) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    return session;
  },

  getSupabaseProfile: async (userId: string) => {
    const profile = await supabase
      .from('profiles')
      .select(`*, projects(*, donations(*)), donations(*, projects(*))`)
      .eq('id', userId)
      .order('created_at', { foreignTable: 'donations', ascending: false })
      .order('created_at', { foreignTable: 'projects', ascending: false })
      .single();
    const sortedProjects: DBProfileWithProjectsAndDonations['projects'] =
      profile.data?.projects
        .map((project) => ({
          ...project,
          donations: project.donations.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ),
        }))
        .sort(
          (a, b) => new Date(b.donations[0].created_at).getTime() - new Date(a.donations[0].created_at).getTime()
        ) || [];
    const filteredProjects = [...new Map(sortedProjects.map((project) => [project.id, project])).values()];
    return {
      ...profile,
      data: { ...profile.data, projects: filteredProjects || [] } as DBProfileWithProjectsAndDonations,
    };
  },

  getSupabaseProjectsWithDonations: async () => {
    return await supabase
      .from('projects')
      .select(`*, donations(*)`)
      .order('created_at', { foreignTable: 'donations', ascending: false });
  },

  uploadSupabaseImage: async (path: string, bucket: string, formData: FormData) => {
    return await supabase.storage.from(bucket).upload(path, formData);
  },

  upsertSupabaseProfile: async (newProfile: DBProfile) => {
    return await supabase.from('profiles').upsert(newProfile);
  },

  makeSupabaseDonation: async (userId: string, projectId: number, donation: number, currentBalance: number) => {
    return await Promise.all([
      supabase.from('donations').insert({
        profile_id: userId,
        project_id: projectId,
        donation,
      }),
      supabase
        .from('profiles')
        .update({
          balance: currentBalance - donation,
        })
        .eq('id', userId),
    ]);
  },

  supabaseSignIn: async (form: LoginForm) => {
    return await supabase.auth.signInWithPassword(form);
  },

  supabaseSignUp: async (form: LoginForm) => {
    return await supabase.auth.signUp(form);
  },

  supabaseSignOut: async () => {
    await supabase.auth.signOut();
  },
};
