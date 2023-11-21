import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBProfileWithProjectsAndDonationsAndRecharges, DBProfileWithSDGs, LoginForm, SDG } from './types';

export default {
  requestFunds: async (userId?: string) => {
    if (!userId) {
      return { data: null, error: { message: 'No session error. Cannot update profile without a session!' } };
    }
    return await supabase.from('profiles').update({ requesting_funds: true }).eq('id', userId);
  },

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

  getCurrentBalance: async (userId: string) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`donations(amount), recharges(amount)`)
      .eq('id', userId)
      .single();
    if (error) {
      return { currentBalance: 0, error };
    }
    const totalDonated = profile.donations.reduce((total, donation) => total + donation.amount, 0);
    const totalRecharged = profile.recharges.reduce((total, charge) => total + charge.amount, 0);
    const currentBalance = totalRecharged - totalDonated;
    return { error: null, currentBalance };
  },

  getSupabaseProfile: async (userId: string) => {
    const { data: profile, ...response } = await supabase
      .from('profiles')
      .select(`*, projects(*, donations(*), sdgs(*)), donations(*, projects(*, sdgs(*))), sdgs(*), recharges(*)`)
      .eq('id', userId)
      .order('created_at', { foreignTable: 'donations', ascending: false })
      .order('created_at', { foreignTable: 'projects', ascending: false })
      .single();
    if (!profile) return { ...response, data: null };
    const sortedProjects: DBProfileWithProjectsAndDonationsAndRecharges['projects'] =
      profile?.projects
        .map(({ sdgs, ...project }) => ({
          ...project,
          donations: project.donations.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ),
          sdg: sdgs?.id as SDG,
        }))
        .sort(
          (a, b) => new Date(b.donations[0].created_at).getTime() - new Date(a.donations[0].created_at).getTime()
        ) || [];
    const filteredProjects = [...new Map(sortedProjects.map((project) => [project.id, project])).values()];
    const donations = profile?.donations.map((donation) => ({
      ...donation,
      project: { ...donation.projects, sdg: donation.projects?.sdgs?.id },
    }));
    const totalRecharged = profile.recharges.reduce((total, charge) => total + charge.amount, 0);
    const totalDonated = profile.donations.reduce((total, donation) => total + donation.amount, 0);
    return {
      ...response,
      data: {
        ...profile,
        balance: totalRecharged - totalDonated,
        SDGs: profile.sdgs.map((sdg) => sdg.id),
        projects: filteredProjects || [],
        donations,
      } as DBProfileWithProjectsAndDonationsAndRecharges,
    };
  },

  getSupabaseProjectsWithDonations: async () => {
    return await supabase
      .from('projects')
      .select(`*, donations(*), sdgs(*)`)
      .order('created_at', { foreignTable: 'donations', ascending: false });
  },

  uploadSupabaseImage: async (path: string, bucket: string, formData: FormData) => {
    return await supabase.storage.from(bucket).upload(path, formData);
  },

  upsertSupabaseProfile: async (newProfile: DBProfileWithSDGs) => {
    return await supabase.from('profiles').upsert(newProfile);
  },
  upsertSupabaseProfileSDGs: async (newProfile: DBProfileWithSDGs) => {
    const results = await Promise.all(
      newProfile.SDGs.map((sdg) => supabase.from('profile_sdgs').upsert({ profile_id: newProfile.id, sdg_id: sdg }))
    );
    results.filter((res) => !!res.error).length;
    return { error: results.filter((res) => !!res.error) };
  },

  makeSupabaseDonation: async (userId: string, projectId: number, amount: number) => {
    return await supabase.from('donations').insert({
      profile_id: userId,
      project_id: projectId,
      amount,
    });
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
