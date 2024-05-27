import { supabase } from './SupabaseService'
import { getCurrentUserId } from './UserService'

export type OrganizationType = { id: string; name: string; logo_url: string }

export async function getCurrentOrganizationId(): Promise<OrganizationType> {
  const userId = await getCurrentUserId()

  const { data: userOrganizations, error: userOrganizationsError } = await supabase
    .from('user_organizations')
    .select('organization_id')
    .eq('user_id', userId)

  if (userOrganizationsError) {
    throw userOrganizationsError
  }

  return userOrganizations![0].organization_id
}

export async function getCurrentOrganization(): Promise<OrganizationType> {
  const id = await getCurrentOrganizationId()

  const { data, error } = await supabase.from('organizations').select('*').eq('id', id)

  if (error) {
    throw error
  }

  return data![0]
}
