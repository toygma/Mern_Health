import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/appointment`,
    credentials: "include",
  }),
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    createAppointment: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Appointment"],
    }),
    deleteAppointment: builder.mutation<any, any>({
      query: ({ id }) => {
        return {
          url: `/${id}/cancel`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Appointment"],
    }),
    getMeAppointment: builder.query<any, void>({
      query: () => "/users",
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetMeAppointmentQuery,
  useDeleteAppointmentMutation,
} = appointmentApi;
