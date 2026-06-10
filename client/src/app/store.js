import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice'
import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";
import { courseApi } from "@/api/courseApi";

export const appStore = configureStore({
  reducer:{
    auth: authReducer,
    [authApi.reducerPath] : authApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    [courseApi.reducerPath] : courseApi.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat
  (authApi.middleware, userApi.middleware,courseApi.middleware)
})