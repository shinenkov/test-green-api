import React, { useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../../api/hooks';
import {
  selectChat,
  selectChats,
} from '../../../store/chat/chatSlice';
import {  useDispatch } from 'react-redux';
import { PhoneInput } from '../../Login/PhoneInput';
import { setChats as setChatsStore } from '../../../store/chat/chatSlice';
import { styles } from '../styles';

export const CreateChat = React.memo(() => {
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useDispatch();
  const chatList = useAppSelector(selectChats);
  const [newChatPhone, setNewChatPhone] = useState('');

  const handleCreateChat = () => {
    const havingChat = chatList.findIndex(
      (ch) => ch.name.trim() === newChatPhone.trim()
    );
    if (havingChat === -1) {
      const newChat = {
        id: (chatList.length + 1).toString(),
        name: newChatPhone,
        avatar: 'Unnamed',
        lastMessage: 'test message from new chat',
      };
      dispatch(setChatsStore([...chatList, newChat]));
    } else {
      dispatch(selectChat(chatList[havingChat].id));
    }
  };

  return (
    <Box sx={classes.createChatBox}>
      <PhoneInput
        sx={{ mr: 2, minWidth: '320px' }}
        name={'7'}
        small
        phone={newChatPhone}
        setPhone={setNewChatPhone}
      />
      <Button
        sx={{ minWidth: '200px' }}
        variant="contained"
        disabled={newChatPhone.trim().length < 17}
        onClick={handleCreateChat}
      >
        Create Chat
      </Button>
    </Box>
  );
});
