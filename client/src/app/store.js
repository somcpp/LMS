import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice'
import { authApi } from "@/api/authApi";

export const appStore = configureStore({
  reducer:{
    auth: authReducer,
    [authApi.reducerPath] : authApi.reducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat
  (authApi.middleware)
})