import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { type BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object, // {}
  FetchBaseQueryMeta
> = fetchBaseQuery({
  credentials: 'include',
});
