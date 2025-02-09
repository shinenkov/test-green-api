import { getUrl } from '../../../api/baseApi';
import { MessageSender } from '../types';

export const handleSend = async (
  idInstance: number | null,
  apiTokenInstance: string | null,
  chatId: string | null,
  newMessage: string
) => {
  if (chatId && idInstance && apiTokenInstance) {
    const response = await fetch(
      getUrl(idInstance, apiTokenInstance, 'sendMessage'),
      {
        method: 'POST',
        body: JSON.stringify({
          chatId: chatId,
          message: newMessage,
        }),
      }
    );
    const { idMessage }: { idMessage: string } = await response.json();
    return idMessage;
  }
};

export const createMessageParams = {
  deletedMessageId: '',
  editedMessageId: '',
  isDeleted: false,
  isEdited: false,
  typeMessage: 'textMessage',
};

export const getSendedMessage = (
  chatId: string | null,
  textMessage: string,
  idMessage: string
) => {
  return {
    ...createMessageParams,
    chatId: chatId || '',
    textMessage,
    type: 'outgoing' as MessageSender,
    timestamp: Math.floor(new Date().getTime() / 1000),
    idMessage,
  };
};

export const getReceivedMessage = (
  chatId: string,
  textMessage: string,
  idMessage: string,
  timestamp: number
) => {
  return {
    ...createMessageParams,
    chatId,
    textMessage,
    type: 'incoming' as MessageSender,
    timestamp,
    idMessage,
  };
};
