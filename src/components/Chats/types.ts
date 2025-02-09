export type InstanceDataType = {
  idInstance: number;
  wid: string;
  typeInstance: string;
};

export type SenderDataType = {
  chatId: string;
  sender: string;
  senderName: string;
  senderContactName: string;
  chatName: string;
};

export type MessageDataType = {
  typeMessage: string;
  textMessageData: TextMessageDataType;
};

export type TextMessageDataType = {
  textMessage: string;
};

export type ReceiveNotificationIncomingBody = {
  typeWebhook: string;
  instanceData: InstanceDataType;
  timestamp: number;
  idMessage: string;
  senderData: SenderDataType;
  messageData: MessageDataType;
};

export type ReceiveNotificationOutgoingBody = {
  chatId: string;
  idMessage: string;
  instanceData: InstanceDataType;
  sendByApi: boolean;
  status: string;
  timestamp: number;
  typeWebhook: string;
};

export type ReceiveNotificationResponse = {
  receiptId: number;
  body: ReceiveNotificationIncomingBody | ReceiveNotificationOutgoingBody;
};

export type MessageType = {
  chatId: string;
  deletedMessageId: string;
  editedMessageId: string;
  idMessage: string;
  isDeleted: boolean;
  isEdited: boolean;
  textMessage: string;
  timestamp: number;
  type: MessageSender;
  typeMessage: string;
  sendByApi?: boolean;
  statusMessage?: string;
  extendedTextMessage?: ExtendedTextMessageType;
  senderContactName?: string;
  senderId?: string;
  senderName?: string;
};

export type ExtendedTextMessageType = {
  description: string;
  forwardingScore: number;
  isForwarded: boolean;
  jpegThumbnail: string;
  previewType: string;
  text: string;
  title: string;
};

export type MessageSender = 'incoming' | 'outgoing';
