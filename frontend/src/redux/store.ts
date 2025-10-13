import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth-api";
import userReducer from "./features/user-slice";
import { userApi } from "./api/user-api";
import { doctorApi } from "./api/doctor-api";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, userApi.middleware,doctorApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
