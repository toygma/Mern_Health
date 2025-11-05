import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/v1/payment`,
    credentials: "include",
  }),
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    createCheckout: builder.mutation({
      query: ({ doctorId, appointmentId }) => {
        return {
          url: `/checkout-session/${doctorId}/${appointmentId}`,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useCreateCheckoutMutation } = checkoutApi;
