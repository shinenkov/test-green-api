export type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};

export type MessageType = {
  id: number;
  text: string;
  sender: 'user' | 'other';
};
