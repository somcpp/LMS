import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice'
import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";

export const appStore = configureStore({
  reducer:{
    auth: authReducer,
    [authApi.reducerPath] : authApi.reducer,
    [userApi.reducerPath] : userApi.reducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat
  (authApi.middleware, userApi.middleware)
})