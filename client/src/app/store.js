import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import { authApi } from "@/api/authApi";
import { userApi } from "@/api/userApi";
import { courseApi } from "@/api/courseApi";
import { lectureApi } from "@/api/lectureApi";
import { purchaseApi } from "@/api/purchaseApi";
import { courseProgressApi } from "@/api/courseProgressApi";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [lectureApi.reducerPath]: lectureApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      courseApi.middleware,
      lectureApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware
    ),
});
