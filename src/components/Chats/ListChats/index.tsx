import React, { useEffect, useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import { Chat } from '../types';
import {
  selectChat,
  setChats,
  selectedChatId,
} from '../../../store/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../../api/hooks';

interface ListChatsProps {
  chats: Chat[];
}

export const ListChats: React.FC<ListChatsProps> = ({ chats }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const chatId = useAppSelector(selectedChatId);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch('https://api.example.com/chats');
      const data = await response.json();
      dispatch(setChats(data.chats));
    };
    fetchChats();
  }, [dispatch]);

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === chatId),
    [chats, chatId]
  );

  const handleChatSelect = (chatId: string) => {
    dispatch(selectChat(chatId));
  };

  return (
    <List>
      {chats.map((chat) => (
        <div key={chat.id} style={{ cursor: 'pointer' }}>
          <ListItem
            sx={
              selectedChat && selectedChat.id === chat.id
                ? {
                    background: theme.palette.action.selected,
                  }
                : {
                    '&:hover': {
                      background: theme.palette.action.hover,
                    },
                  }
            }
            onClick={() => handleChatSelect(chat.id)}
          >
            <Avatar alt={chat.name} src={chat.avatar} sx={{ marginRight: 2 }} />
            <ListItemText primary={chat.name} secondary={chat.lastMessage} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};
