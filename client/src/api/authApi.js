import { BASE_URL } from "@/app/constants";
import { userLoggedIn, userLoggedOut } from "@/redux/authSlice";
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const AUTH_API = BASE_URL+"auth";

export const authApi = createApi({
  reducerPath:"authApi",
  baseQuery:fetchBaseQuery({
    baseUrl:AUTH_API,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
        query: (inputData) => ({
          url: "signup",
          method: "POST",
          body: inputData
        })
    }),
    loginUser: builder.mutation({
        query: (inputData) => ({
          url: "login",
          method: "POST",
          body: inputData
        }),
        async onQueryStarted(arg, {queryFulfilled,dispatch}) {
          try {
            const {data} = await queryFulfilled;
            dispatch(userLoggedIn({user:data.user}))
          } catch (error) {
            console.log(error);
          }
        }
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET"
      }),
      async onQueryStarted(arg, {queryFulfilled,dispatch}) {
          try {
            dispatch(userLoggedOut())
          } catch (error) {
            console.log(error);
          }
        }
    })
  })
})

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation
} = authApi;