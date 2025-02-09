import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../appStore';

export type Chat = {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  unreaded?: boolean;
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
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats = [...state.chats, action.payload];
      state.selectedChatId = action.payload.phone;
    },
    selectChat: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
  },
});

export const { setChats, selectChat, addChat } = chatSlice.actions;

export const selectedChatId = (state: RootState) => state.chat.selectedChatId;
export const selectChats = (state: RootState) => state.chat.chats;
export default chatSlice;
