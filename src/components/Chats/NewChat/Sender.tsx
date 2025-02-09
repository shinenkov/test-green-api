import React, { useState, useCallback } from 'react';
import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MessageType } from '../types';
import { useAppSelector } from '../../../api/hooks';
import { selectedChatId } from '../../../store/chat/chatSlice';
import { styles } from '../styles';
import { selectAuth } from '../../../store/auth/authSlice';
import { getSendedMessage, handleSend } from './utils';
import { colors } from '../../../theme';

type SenderProps = {
  messagesRef: React.RefObject<HTMLUListElement>;
  setMessages: (value: MessageType[]) => void;
  messages: MessageType[];
};

export const Sender = React.memo(({ setMessages, messages }: SenderProps) => {
  const theme = useTheme();
  const classes = styles(theme);
  const [newMessage, setNewMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const chatId = useAppSelector(selectedChatId);
  const { idInstance, apiTokenInstance } = useAppSelector(selectAuth);

  const handleSendMessage = useCallback(async () => {
    if (newMessage.trim()) {
      setIsLoading(true);
      try {
        const idMessage = await handleSend(
          idInstance,
          apiTokenInstance,
          chatId,
          newMessage
        );
        if (idMessage) {
          setMessages([
            ...messages,
            getSendedMessage(chatId, newMessage, idMessage),
          ]);
          setNewMessage('');
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [newMessage, chatId, idInstance, apiTokenInstance, setMessages, messages]);

  const handleMessageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={classes.messageInput}>
      {isError && (
        <Box sx={{ color: colors.danger }}>Ошибка отправки сообщения</Box>
      )}
      <TextField
        fullWidth
        variant="outlined"
        value={newMessage}
        multiline
        maxRows={6}
        onKeyDown={handleMessageKeyDown}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        sx={{ mr: 1 }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
      </Button>
    </Box>
  );
});
