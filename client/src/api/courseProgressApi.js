import { BASE_URL } from "@/app/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const COURSE_PROGRESS_API = BASE_URL + "progress"

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method:"POST"
      }),
    }),
  })
})

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation
} = courseProgressApi