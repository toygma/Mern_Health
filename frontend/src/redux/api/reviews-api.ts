import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    createReviews: builder.mutation<any, any>({
      query: ({ id, body }) => {
        return {
          url: `/${id}`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    deleteReviews: builder.mutation<any, any>({
      query: ({ id }) => {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getMeReviews: builder.query<any, void>({
      query: () => "/",
      providesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewsMutation,
  useGetMeReviewsQuery,
  useDeleteReviewsMutation,
} = reviewsApi;
