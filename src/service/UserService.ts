import { supabase } from './SupabaseService';

export type UserType = {id: string, email: string, password: string};

export async function getCurrentUserId(): Promise<UserType | null> {
  const user = supabase.auth.user();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from<UserType>('users')
    .select('id')
    .eq('id', user.id);

  if (error) {
    throw error;
  }

  return data![0].id;
}

export async function getCurrentUser(): Promise<UserType | null> {
  const user = supabase.auth.user();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from<UserType>('users')
    .select('*')
    .eq('id', user.id);

  if (error) {
    throw error;
  }

  return data![0];
}
