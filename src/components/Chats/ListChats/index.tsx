import React, { useEffect, useMemo } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  useTheme,
  Chip,
} from '@mui/material';
import {
  ReceiveNotificationIncomingBody,
  ReceiveNotificationResponse,
} from '../types';
import {
  addChat,
  Chat,
  selectChat,
  selectedChatId,
  setChats,
} from '../../../store/chat/chatSlice';
import { useAppSelector, useAppDispatch } from '../../../api/hooks';
import { selectAuth } from '../../../store/auth/authSlice';
import {
  deleteNotification,
  deleteNotify,
  getNotification,
  selectNotifications,
} from '../../../store/notification/notificationSlice';

interface ListChatsProps {
  chats: Chat[];
}

export const ListChats: React.FC<ListChatsProps> = ({ chats }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const chatId = useAppSelector(selectedChatId);
  const notifications = useAppSelector(selectNotifications);

  const { idInstance: idInst, apiTokenInstance: token } =
    useAppSelector(selectAuth);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (idInst && token) {
        dispatch(
          getNotification({ idInstance: idInst, apiTokenInstance: token })
        );
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [idInst, token]);

  const handleChatSelect = (chatId: string) => {
    const lastNotify = notifications?.find(
      (n) => 'senderData' in n.body && n.body.senderData.chatId === chatId
    );
    if (lastNotify) {
      dispatch(deleteNotify(lastNotify.receiptId));
      deleteNotification(lastNotify.receiptId);
      const newChats = updateChatUnreaded(chats, chatId, false);
      dispatch(setChats(newChats));
    }
    dispatch(selectChat(chatId));
  };

  const updateChatUnreaded = (
    chats: Chat[],
    chatId: string,
    unreaded: boolean
  ) => {
    return chats.map((chat) => {
      if (chat.phone === chatId) {
        const newChat = { ...chat, unreaded };
        return newChat;
      }
      return chat;
    });
  };

  const handleNewNotification = () => {
    if (notifications && notifications.length > 0) {
      const notify = notifications?.find((notification) => {
        if (
          chats.some(
            (c) =>
              'senderData' in notification.body &&
              notification.body.senderData.chatId === c.phone
          )
        ) {
          return notification;
        }
      });
      if (notify) {
        const newChats = updateChatLastMessage(chats, notify);
        if (newChats) {
          dispatch(setChats(newChats));
        }
      } else {
        notifications?.forEach((notification) => {
          const newChat = createNewChat(chats, notification);
          if (newChat) {
            dispatch(addChat(newChat));
          }
        });
      }
    }
  };

  const updateChatLastMessage = (
    chats: Chat[],
    notify: ReceiveNotificationResponse
  ) => {
    const body = notify.body as ReceiveNotificationIncomingBody;
    return chats.map((chat) => {
      if (
        chat.phone === body.senderData.chatId &&
        body.messageData &&
        body.senderData
      ) {
        const newChat = {
          ...chat,
          lastMessage: body.messageData.textMessageData?.textMessage,
          name:
            body.senderData.chatName ||
            body.senderData.senderName ||
            body.senderData.senderContactName,
          unreaded: true,
        };
        return newChat;
      }
      return chat;
    });
  };

  const createNewChat = (
    chats: Chat[],
    notification: ReceiveNotificationResponse
  ) => {
    const body = notification.body as ReceiveNotificationIncomingBody;
    if ('senderData' in body && body.senderData && body.messageData) {
      return {
        id: (chats.length + 1).toString(),
        name:
          body.senderData.chatName ||
          body.senderData.senderName ||
          body.senderData.senderContactName,
        phone: body.senderData.chatId,
        avatar: '',
        unreaded: true,
        lastMessage: body.messageData.textMessageData.textMessage,
      };
    }
  };

  useEffect(() => {
    handleNewNotification();
  }, [notifications]);

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.phone === chatId),
    [chats, chatId]
  );

  return (
    <List>
      {chats.map((chat) => {
        return (
          <div key={chat.id} style={{ cursor: 'pointer' }}>
            <ListItem
              sx={
                selectedChat && selectedChat.phone === chat.phone
                  ? {
                      background: theme.palette.action.selected,
                    }
                  : {
                      '&:hover': {
                        background: theme.palette.action.hover,
                      },
                    }
              }
              onClick={() => handleChatSelect(chat.phone)}
            >
              <Avatar
                alt={chat.name}
                src={chat.avatar}
                sx={{ marginRight: 2 }}
              />
              <ListItemText primary={chat.name} secondary={chat.lastMessage} />
              {chat.unreaded && <Chip size="small" label="1" color="primary" />}
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};
