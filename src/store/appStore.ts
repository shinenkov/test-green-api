import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './rootReducer';
import { baseApi } from '../api/baseApi';

export function makeStore() {
  const store = configureStore({
    reducer: rootReducer as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
}

export type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const appStore = makeStore();

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
