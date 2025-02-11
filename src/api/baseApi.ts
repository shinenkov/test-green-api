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
) => `${process.env.GREEN_API}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
