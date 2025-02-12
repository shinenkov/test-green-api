import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MessageType, ReceiveNotificationIncomingBody } from '../types';
import { useAppSelector } from '../../../api/hooks';
import {
  selectedChatId,
  selectChat,
  selectChats,
  setChats,
} from '../../../store/chat/chatSlice';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { styles } from '../styles';
import { Message } from './Message';
import { Sender } from './Sender';
import { CreateChat } from '../CreateChat';
import { getUrl } from '../../../api/baseApi';
import { selectAuth } from '../../../store/auth/authSlice';
import {
  deleteNotification,
  deleteNotify,
  selectNotifications,
} from '../../../store/notification/notificationSlice';
import { getReceivedMessage } from './utils';
import { ScrollDownButton } from './ScrollDownButton';

export const NewChat = React.memo(() => {
  const theme = useTheme();
  const classes = styles(theme);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewOtherSenderMessages, setIsNewOtherSenderMessages] =
    useState(false);

  const messagesRef = useRef<HTMLUListElement>(null);

  const chatId = useAppSelector(selectedChatId);
  const { idInstance: idInst, apiTokenInstance: token } =
    useAppSelector(selectAuth);

  const chatList = useAppSelector(selectChats);
  const notifications = useAppSelector(selectNotifications);

  const debouncedFetchMessages = useMemo(
    () =>
      debounce(async () => {
        setIsLoading(true);
        if (chatId && idInst && token) {
          const response = await fetch(
            getUrl(idInst, token, 'getChatHistory'),
            {
              method: 'POST',
              body: JSON.stringify({ chatId, count: 20 }),
            }
          );
          const data: MessageType[] = await response.json();

          setMessages(() => data.reverse());
        }
        setIsLoading(false);
      }, 500),
    [chatId, idInst, token]
  );

  useEffect(() => {
    debouncedFetchMessages();
  }, [debouncedFetchMessages]);

  useEffect(() => {
    if (chatList.some((chat) => chat.unreaded) && notifications && chatId) {
      const notify = notifications?.find(
        (n) => 'senderData' in n.body && n.body.senderData?.chatId === chatId
      );
      if (notify) {
        const body = notify?.body as ReceiveNotificationIncomingBody;
        const { messageData, idMessage } = body;
        if (
          messages.every(
            (message) =>
              message.idMessage !== body.idMessage &&
              messageData?.textMessageData !== undefined &&
              idMessage !== undefined
          )
        ) {
          setMessages((prevState) => [
            ...prevState,
            getReceivedMessage(
              chatId,
              messageData?.textMessageData.textMessage ?? '',
              idMessage ?? '',
              body.timestamp ?? 0
            ),
          ]);
        } else {
          if (!isNewOtherSenderMessages) {
            dispatch(deleteNotify(notify.receiptId));
            deleteNotification(notify.receiptId);
            const newChats = chatList.map((chat) => {
              if (chat.phone === body.senderData?.chatId) {
                const newChat = { ...chat, lastMessage: '', unreaded: false };
                return newChat;
              }
              return chat;
            });
            dispatch(setChats(newChats));
          }
        }
      }
    }
  }, [chatList, chatId, notifications, isNewOtherSenderMessages]);

  const handleCloseChat = () => {
    dispatch(selectChat(null));
  };

  const handleSetMessages = useCallback(
    (value: MessageType[]) => {
      setMessages(value);
    },
    [setMessages]
  );

  useEffect(() => {
    if (messagesRef.current) {
      if (messages[messages.length - 1]?.type === 'outgoing') {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      } else {
        if (
          messagesRef.current.scrollHeight > messagesRef.current.clientHeight
        ) {
          setIsNewOtherSenderMessages(true);
        }
      }
    }
  }, [messages, messagesRef]);

  const hangleCloseScrollDown = useCallback(() => {
    setIsNewOtherSenderMessages(false);
  }, [setIsNewOtherSenderMessages]);

  useEffect(() => {
    if (!isLoading && messagesRef.current) {
      hangleCloseScrollDown();
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messagesRef, isLoading, hangleCloseScrollDown]);

  const countOfOtherSenderMessages = [...messages]
    .reverse()
    .findIndex((mes) => mes.type === 'outgoing');

  return (
    <Box sx={classes.container}>
      <Paper sx={classes.paper}>
        {chatId ? (
          <>
            <Box sx={classes.chatHeader}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {`+${chatId.replace('@c.us', '')}`}
              </Typography>
              <Button variant="contained" onClick={handleCloseChat}>
                Close
              </Button>
            </Box>
            <Divider />
            {isLoading ? (
              <Box sx={classes.createChatBox}>
                <CircularProgress size={120} sx={{ height: '100%' }} />
              </Box>
            ) : (
              <>
                <List sx={classes.messageList} ref={messagesRef}>
                  {messages.map((message) => (
                    <Message key={message.idMessage} message={message} />
                  ))}
                </List>
                {isNewOtherSenderMessages && countOfOtherSenderMessages > 0 && (
                  <ScrollDownButton
                    scrollRef={messagesRef}
                    handleClose={hangleCloseScrollDown}
                    count={countOfOtherSenderMessages}
                  />
                )}
                <Sender
                  messagesRef={messagesRef}
                  messages={messages}
                  setMessages={handleSetMessages}
                />
              </>
            )}
          </>
        ) : (
          <CreateChat />
        )}
      </Paper>
    </Box>
  );
});
