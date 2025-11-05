import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setisAuthenticated,
  setLoading,
  setUser,
} from "../features/user-slice";
import type { IUser } from "../../types/types";

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
    updateProfile: builder.mutation({
      query({ id, body }) {
        return {
          url: `/${id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["User"],
    }),
    getAllDetail: builder.query<any, any>({
      query: (id) => `/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateProfileMutation,
  useGetAllDetailQuery,
} = userApi;
