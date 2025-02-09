import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'base',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export const getUrl = (
  idInstance: number,
  apiTokenInstance: string,
  method: string
) => `green/waInstance${idInstance}/${method}/${apiTokenInstance}`;
