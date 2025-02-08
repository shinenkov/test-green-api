import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../appStore';

interface AuthState {
  isAuthenticated: boolean;
  idInstance: string | null;
  apiTokenInstance: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  idInstance: null,
  apiTokenInstance: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (
    {
      idInstance,
      apiTokenInstance,
    }: { idInstance: string; apiTokenInstance: string },
    { rejectWithValue }
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { idInstance, apiTokenInstance };
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
        state.loading = false;
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
