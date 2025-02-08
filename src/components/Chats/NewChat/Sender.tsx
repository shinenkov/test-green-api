import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MessageType } from '../types';
import { useAppSelector } from '../../../api/hooks';
import {
  selectedChatId,
} from '../../../store/chat/chatSlice';
import { debounce } from 'lodash';
import { styles } from '../styles';
import { ScrollDownButton } from './ScrollDownButton';

type SenderProps = {
  messagesRef: React.RefObject<HTMLUListElement>
  setMessages: (value: MessageType[]) => void
  messages: MessageType[]
}

export const Sender = React.memo(({
  messagesRef,
  setMessages,
  messages,
}: SenderProps) => {
  const theme = useTheme();
  const classes = styles(theme);
  const [newMessage, setNewMessage] = useState('');
  const [isNewOtherSenderMessages, setIsNewOtherSenderMessages] = useState(false);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          sender: messages.length > 8 ? 'other' : messages.length % 2 === 0 ? 'user' : 'other',
        },
      ]);
      setNewMessage('');
    }
  }, [messages, newMessage, setMessages]);

  const chatId = useAppSelector(selectedChatId);
 
  const debouncedFetchMessages = useMemo(
    () =>
      debounce(async () => {
        if (chatId) {
          const response = await fetch(`/mock/chats/${chatId}/messages`);
          const data = await response.json();
          setMessages([...messages, ...data]);
        }
      }, 500),
    [chatId, messages, setMessages]
  );

  useEffect(() => {
    debouncedFetchMessages();
  }, [debouncedFetchMessages]);

  useEffect(() => {
    if (messagesRef.current) {
      if (messages[messages.length - 1]?.sender === 'user') {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      } else {
        if (messagesRef.current.scrollHeight > messagesRef.current.clientHeight) {
          setIsNewOtherSenderMessages(true)
        }
      }
    }
  }, [messages, messagesRef]);

  const handleMessageKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const hangleCloseScrollDown = useCallback(() => {
      setIsNewOtherSenderMessages(false)
    }, [setIsNewOtherSenderMessages]
  );

  const countOfOtherSenderMessages = [...messages].reverse().findIndex((mes) => (mes.sender === 'user'))
  return (
    <Box sx={classes.messageInput}>
      {(isNewOtherSenderMessages && countOfOtherSenderMessages > 0) && (<ScrollDownButton 
        scrollRef={messagesRef}
        handleClose={hangleCloseScrollDown}
        count={countOfOtherSenderMessages}
      />)}
      <TextField
        fullWidth
        variant="outlined"
        value={newMessage}
        multiline
        maxRows={6}
        onKeyDown={handleMessageKeyDown}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        sx={{ mr: 1 }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send
      </Button>
    </Box>
  );
});

