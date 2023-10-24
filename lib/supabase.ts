import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zyvhfomclqlhrbkvgokr.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5dmhmb21jbHFsaHJia3Znb2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4ODEyMDAsImV4cCI6MjAxMjQ1NzIwMH0.udPLPFIxMZYtIggs6OzwvDNXTTrzKGaW-rgMV2t3OJE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
