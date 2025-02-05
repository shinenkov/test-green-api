import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'base',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
