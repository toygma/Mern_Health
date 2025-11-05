import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth-api";
import userReducer from "./features/user-slice";
import { userApi } from "./api/user-api";
import { doctorApi } from "./api/doctor-api";
import { appointmentApi } from "./api/appointment-api";
import { reviewsApi } from "./api/reviews-api";
import { checkoutApi } from "./api/checkout-api";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      doctorApi.middleware,
      appointmentApi.middleware,
      reviewsApi.middleware,
      checkoutApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
