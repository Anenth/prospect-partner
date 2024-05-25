
export type TemplateMessageType =  {id: string, message: string, order: number};

function getAllMessages(): TemplateMessageType[] {
  const messages = localStorage.getItem('messages');
  return messages ? JSON.parse(messages) : [];
}

