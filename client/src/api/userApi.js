import { BASE_URL } from "@/app/constants";
import { userLoggedIn } from "@/redux/authSlice";
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const USER_API = BASE_URL + "user";

export const userApi = createApi({
  reducerPath:"userApi",
  baseQuery:fetchBaseQuery({
    baseUrl:USER_API,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "profile",
        method: "GET"
      }),
      async onQueryStarted(arg, {queryFulfilled,dispatch}) {
                try {
                  const {data} = await queryFulfilled;
                  dispatch(userLoggedIn({user:data.user}))
                } catch (error) {
                  console.log(error);
                }
              },
      providesTags: ["User"]
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "/update",
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: ["User"]
    })
  })
})

export const {
  useGetUserProfileQuery,
  useUpdateUserMutation
} = userApi
