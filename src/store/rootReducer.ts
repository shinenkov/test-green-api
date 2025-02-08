import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import authSlice from './auth/authSlice';
import chatSlice from './chat/chatSlice';

export const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [chatSlice.name]: chatSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
