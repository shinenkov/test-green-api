import React, { memo } from 'react';
import {
  Paper,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import { MessageType } from '../types';

type MessageProps = {
  message: MessageType
}

export const Message: React.FC<MessageProps> = memo(({ message }) => {
  const theme = useTheme();

  return (
    <ListItem
      sx={{
        justifyContent:
          message.sender === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <Paper
        sx={{
          p: 1,
          bgcolor:
            message.sender === 'user'
              ? theme.palette.primary.main
              : theme.palette.grey[300],
          color:
            message.sender === 'user'
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
          maxWidth: '70%',
          wordBreak: 'break-all',
        }}
      >
        <ListItemText primary={message.text} />
      </Paper>
    </ListItem>      
  );
});
