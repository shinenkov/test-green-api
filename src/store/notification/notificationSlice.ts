import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ReceiveNotificationResponse } from '../../components/Chats/types';
import { RootState } from '../appStore';
import { getUrl } from '../../api/baseApi';

interface NotificationState {
  notifications: ReceiveNotificationResponse[] | null;
}

const initialState: NotificationState = {
  notifications: [],
};

export const deleteNotification = async (receiptId: number) => {
  const idInstance = sessionStorage.getItem('idInstance');
  const apiTokenInstance = sessionStorage.getItem('apiTokenInstance');
  if (idInstance && apiTokenInstance) {
    const response = await fetch(
      `${process.env.GREEN_API}waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        method: 'DELETE',
      }
    );
    const data: { result: boolean } = await response.json();
    console.log('Deleted notification: ', receiptId, ': ', data);
  }
};

export const getNotification = createAsyncThunk(
  'notification/get',
  async (
    {
      idInstance,
      apiTokenInstance,
    }: { idInstance: number; apiTokenInstance: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        getUrl(idInstance, apiTokenInstance, 'receiveNotification')
      );
      const data: ReceiveNotificationResponse | null = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        'Get notification failed. Please check your credentials.'
      );
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    deleteNotify: (state, action: PayloadAction<number>) => {
      state.notifications =
        state.notifications?.filter((n) => n.receiptId !== action.payload) ??
        null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotification.fulfilled, (state, action) => {
      if (
        action.payload &&
        state.notifications?.findIndex(
          (n) => n.receiptId === action.payload?.receiptId
        ) === -1
      ) {
        if (
          'typeWebhook' in action.payload.body &&
          action.payload.body.typeWebhook === '"outgoingAPIMessageReceived"'
        ) {
          deleteNotification(action.payload.receiptId);
        } else {
          state.notifications.push(action.payload);
        }
      }
    });
  },
});

export const { deleteNotify } = notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;

export default notificationSlice;
