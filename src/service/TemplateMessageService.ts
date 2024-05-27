import {} from 'idb'
// import { getCurrentOrganizationId } from './OrganizationService';
// import { supabase } from './SupabaseService'

export type TemplateMessageType = { id: string; message: string; order: number }
const STORE_NAME = 'messages'

// Function to get all messages from local storage
export function getAllMessages(): TemplateMessageType[] {
  const messagesStr = localStorage.getItem(STORE_NAME)
  if (messagesStr) {
    return JSON.parse(messagesStr)
  }
  return []
}

// Function to update a message in local storage
export function updateMessages(messages: Array<TemplateMessageType>): void {
  localStorage.setItem(STORE_NAME, JSON.stringify(messages))
}

// const messageTemplateKey = 'messages'
// // Function to get message templates
// export async function getMessageTemplates(): Promise<TemplateMessageType[]> {
//   const orgId = await getCurrentOrganizationId()

//   const { data, error } = await supabase
//     .from<TemplateMessageType>(messageTemplateKey)
//     .select('*')
//     .eq('user_organization_id', orgId)

//   if (error) {
//     throw error
//   }

//   return data || []
// }

// // Function to save a message template
// export async function saveMessageTemplate(
//   template: TemplateMessageType,
// ): Promise<TemplateMessageType> {
//   const orgId = await getCurrentOrganizationId()
//   const userId = await getCurrentUserId()

//   const { data, error } = await supabase
//     .from<TemplateMessageType>(messageTemplateKey)
//     .insert({ ...template, user_organization_id: orgId, created_by: userId })

//   if (error) {
//     throw error
//   }

//   return data![0]
// }
