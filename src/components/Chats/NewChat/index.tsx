import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MessageType } from '../types';
import { useAppSelector } from '../../../api/hooks';
import {
  ChatState,
  selectedChatId,
  selectChat,
} from '../../../store/chat/chatSlice';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { styles } from '../styles';
import { Message } from './Message';
import { Sender } from './Sender';
import { CreateChat } from './CreateChat';

export const NewChat = React.memo(() => {
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesRef = useRef<HTMLUListElement>(null);

  const chatId = useAppSelector(selectedChatId);
  const { chats } = useSelector((state: { chat: ChatState }) => state.chat);

  const debouncedFetchMessages = useMemo(
    () =>
      debounce(async () => {
        if (chatId) {
          const response = await fetch(`/mock/chats/${chatId}/messages`);
          const data = await response.json();
          setMessages((prevMessages) => [...prevMessages, ...data]);
        }
      }, 500),
    [chatId]
  );

  useEffect(() => {
    debouncedFetchMessages();
  }, [debouncedFetchMessages]);

  const handleCloseChat = () => {
    dispatch(selectChat(null));
  };

  const handleSetMessages = useCallback(
    (value: MessageType[]) => {
      setMessages(value)
    }, [setMessages],
  );

  return (
    <Box sx={classes.container}>
      <Paper sx={classes.paper}>
        {chatId ? (
          <>
            <Box sx={classes.chatHeader}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {chatId ? chats.find((ch) => ch.id === chatId)?.name : 'Chat'}
              </Typography>
              <Button variant="contained" onClick={handleCloseChat}>
                Close
              </Button>
            </Box>
            <Divider />
            <List sx={classes.messageList} ref={messagesRef}>
              {messages.map((message) => (
                <Message key={message.id} message={message}/>
              ))}
            </List>
            <Sender
              messagesRef={messagesRef}
              messages={messages}
              setMessages={handleSetMessages}
            />
          </>
        ) : (
          <CreateChat />
        )}
      </Paper>
    </Box>
  );
});
