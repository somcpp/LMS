import { BASE_URL } from "@/app/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = BASE_URL+"purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery:fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: 'include'
  }),
  endpoints:(builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    get_Courses_Detail_With_Status: builder.query({
      query: (courseId) => ({
        url: `/getCourseDetails/${courseId}`,
        method: "GET"
      })
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: '/',
        method: "GET"
      })
    })
  })
})

export const {
  useCreateCheckoutSessionMutation,
  useGet_Courses_Detail_With_StatusQuery,
  useGetPurchasedCoursesQuery
} = purchaseApi