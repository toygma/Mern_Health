import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setisAuthenticated,
  setLoading,
  setUser,
} from "../features/user-slice";
import type { IUser } from "../../types/auth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => "/me",
      transformResponse: (response: { user: IUser }) => response.user,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setisAuthenticated(true));
        } catch (error) {
          dispatch(setUser(null));
          dispatch(setisAuthenticated(false));
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
