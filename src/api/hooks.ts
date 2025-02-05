import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  useSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';
import { AppDispatch, RootState, type ThunkApiConfig } from '../store/appStore';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
