import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../appStore';
import { SettingsResponse } from './types';
import { getUrl } from '../../api/baseApi';
import { setSettings, defaultSettingsForThisApp } from './utils';

type AuthState = {
  isAuthenticated: boolean;
  idInstance: number | null;
  apiTokenInstance: string | null;
  wid: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  idInstance: null,
  apiTokenInstance: null,
  wid: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    {
      idInstance,
      apiTokenInstance,
    }: { idInstance: number; apiTokenInstance: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        getUrl(idInstance, apiTokenInstance, 'getSettings')
      );
      const data: SettingsResponse = await response.json();
      if (data.wid) {
        setSettings(idInstance, apiTokenInstance, defaultSettingsForThisApp);
      }
      return { idInstance, apiTokenInstance, wid: data.wid };
    } catch (error) {
      console.error(error);
      return rejectWithValue('Login failed. Please check your credentials.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.idInstance = null;
      state.apiTokenInstance = null;
      state.wid = null;
      sessionStorage.removeItem('idInstance');
      sessionStorage.removeItem('apiTokenInstance');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.idInstance = action.payload.idInstance;
        state.apiTokenInstance = action.payload.apiTokenInstance;
        state.wid = action.payload.wid;
        state.loading = false;
        sessionStorage.setItem(
          'idInstance',
          action.payload.idInstance.toString()
        );
        sessionStorage.setItem(
          'apiTokenInstance',
          action.payload.apiTokenInstance
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice;
