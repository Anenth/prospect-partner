import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseCred } from '../Utils/EnvUtils';

const cred = getSupabaseCred();
export const supabase = createClient(cred.url, cred.key);

