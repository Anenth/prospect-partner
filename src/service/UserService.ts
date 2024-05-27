import { supabase } from './SupabaseService';

export type UserType = {id: string, email: string, password: string};

export async function getCurrentUserId(): Promise<UserType | null> {
  const user = supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return Object.values(user)[0].id;
}

export async function getCurrentUser(): Promise<UserType | null> {
  const user = supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return Object.values(user)[0];
}
