export type SettingsResponse = {
  wid: string;
  countryInstance: string;
  typeAccount: string;
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: 'yes' | 'no';
  markIncomingMessagesReadedOnReply: 'yes' | 'no';
  sharedSession: string;
  outgoingWebhook: 'yes' | 'no';
  outgoingMessageWebhook: 'yes' | 'no';
  outgoingAPIMessageWebhook: 'yes' | 'no';
  incomingWebhook: 'yes' | 'no';
  deviceWebhook: 'yes' | 'no';
  statusInstanceWebhook: string;
  stateWebhook: 'yes' | 'no';
  enableMessagesHistory: string;
  keepOnlineStatus: string;
  pollMessageWebhook: 'yes' | 'no';
  incomingBlockWebhook: 'yes' | 'no';
  incomingCallWebhook: 'yes' | 'no';
  editedMessageWebhook: 'yes' | 'no';
  deletedMessageWebhook: 'yes' | 'no';
};

export type SettingsSetter = Partial<Omit<SettingsResponse, 'wid'>>;
