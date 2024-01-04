import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { DBProfileWithProjectsAndDonations, DBProfileWithSDGs, LoginForm, SDG } from './types';

export default {
  requestFunds: async (userId?: string) => {
    if (!userId) {
      return { data: null, error: { message: 'No session error. Cannot update profile without a session!' } };
    }
    return await supabase.from('profiles').update({ requesting_funds: true }).eq('id', userId);
  },

  setSeenMarketplace: async (userId?: string) => {
    if (!userId) {
      return { data: null, error: { message: 'No session error. Cannot update profile without a session!' } };
    }
    return await supabase.from('profiles').update({ seen_marketplace: true }).eq('id', userId);
  },

  setMadeFirstDonation: async (userId?: string) => {
    if (!userId) {
      return { data: null, error: { message: 'No session error. Cannot update profile without a session!' } };
    }
    return await supabase.from('profiles').update({ made_first_donation: true }).eq('id', userId);
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
    const { data: balance, error } = await supabase
      .from('profile_balances')
      .select(`*`)
      .eq('profile_id', userId)
      .single();
    if (error) {
      return { currentBalance: 0, error };
    }
    const currentBalance = balance.balance || 0;
    return { error: null, currentBalance };
  },

  getProfileBalance: async (userId: string) => {
    return await supabase.from('profile_balances').select('balance').eq('profile_id', userId).single();
  },

  getSupabaseProfile: async (userId: string) => {
    const { data: profile, ...response } = await supabase
      .from('profiles')
      .select(`*, projects(*, donations(*), sdgs(*), spending_reports(*)), donations(*, projects(*, sdgs(*))), sdgs(*)`)
      .eq('id', userId)
      .order('created_at', { foreignTable: 'donations', ascending: false })
      .order('created_at', { foreignTable: 'projects', ascending: false })
      .single();
    if (!profile) return { ...response, data: null };
    const sortedProjects: DBProfileWithProjectsAndDonations['projects'] =
      profile?.projects
        .map(({ sdgs, ...project }) => ({
          ...project,
          donations: project.donations.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          ),
          spending_report: project.spending_reports,
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
    return {
      ...response,
      data: {
        ...profile,
        SDGs: profile.sdgs.map((sdg) => sdg.id),
        projects: filteredProjects || [],
        donations,
      } as DBProfileWithProjectsAndDonations,
    };
  },

  getSupabaseProjectsWithDonationsAndSpendingReport: async () => {
    return await supabase
      .from('projects')
      .select(`*, donations(*), sdgs(*), spending_reports(*)`)
      .order('created_at', { foreignTable: 'donations', ascending: false })
      .order('created_at', { foreignTable: 'spending_reports', ascending: false });
  },

  getSupabaseProducts: async () => {
    return await supabase.from('products').select(`*, sdgs(*)`);
  },

  uploadSupabaseImage: async (path: string, bucket: string, base64: ArrayBuffer, contentType: string) => {
    return supabase.storage.from(bucket).upload(path, base64, { contentType });
  },

  upsertSupabaseProfile: async ({ SDGs, ...newProfile }: DBProfileWithSDGs, userId: string) => {
    return await Promise.all([
      supabase.from('profiles').upsert(newProfile),
      ...SDGs.map((sdg) => supabase.from('profile_sdgs').upsert({ profile_id: userId, sdg_id: sdg })),
    ]);
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
    const user = (await supabase.auth.admin.listUsers()).data?.users.filter((user) => user.email === form.email)[0];
    const isAdmin = !!(await supabase.from('admins').select('*').eq('id', user.id).single()).data;
    if (isAdmin) return { error: { message: 'User is an admin.' } };
    return await supabase.auth.signInWithPassword(form);
  },

  supabaseSignUp: async (form: LoginForm) => {
    return await supabase.auth.signUp(form);
  },

  supabaseSignOut: async () => {
    await supabase.auth.signOut();
  },
};
