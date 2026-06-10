import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/course/"

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
        query: (inputData) => ({
          url: "create",
          method: "POST",
          body: inputData
        }),
        invalidatesTags: ['refetch_creator_courses']
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: ""
      }),
      providesTags: ['refetch_creator_courses']
    }),
    updateCourse: builder.mutation({
      query: ({formData,courseId}) => ({
        url: `update/${courseId}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: ['refetch_creator_courses']
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url:`${courseId}`
      })
    })
  })
})

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery
} = courseApi