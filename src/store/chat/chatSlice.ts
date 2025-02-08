import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore';

export type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};

export interface ChatState {
  chats: Chat[];
  selectedChatId: string | null;
}

const initialState: ChatState = {
  chats: [],
  selectedChatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    selectChat: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { setChats, selectChat } = chatSlice.actions;

export const selectedChatId = (state: RootState) => state.chat.selectedChatId;
export const selectChats = (state: RootState) => state.chat.chats;
export default chatSlice;
