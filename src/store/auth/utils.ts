import { getUrl } from '../../api/baseApi';
import { SettingsSetter } from './types';

export const defaultSettingsForThisApp: SettingsSetter = {
  countryInstance: 'no',
  typeAccount: 'no',
  webhookUrl: '',
  webhookUrlToken: '',
  delaySendMessagesMilliseconds: 0,
  markIncomingMessagesReaded: 'no',
  markIncomingMessagesReadedOnReply: 'no',
  sharedSession: 'no',
  outgoingWebhook: 'no',
  outgoingMessageWebhook: 'yes',
  outgoingAPIMessageWebhook: 'yes',
  incomingWebhook: 'yes',
  deviceWebhook: 'no',
  statusInstanceWebhook: 'no',
  stateWebhook: 'no',
  enableMessagesHistory: 'no',
  keepOnlineStatus: 'no',
  pollMessageWebhook: 'no',
  incomingBlockWebhook: 'no',
  incomingCallWebhook: 'no',
  editedMessageWebhook: 'no',
  deletedMessageWebhook: 'no',
};

export const setSettings = async (
  idInstance: number,
  apiTokenInstance: string,
  settings: SettingsSetter
) => {
  const response = await fetch(
    getUrl(idInstance, apiTokenInstance, 'setSettings'),
    {
      method: 'POST',
      body: JSON.stringify(settings),
    }
  );

  const data: { saveSettings: boolean } = await response.json();
  console.log('data', data);

  return data;
};
