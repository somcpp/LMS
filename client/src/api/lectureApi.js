import { BASE_URL } from "@/app/constants";
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = BASE_URL + "lecture/"

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({lectureTitle, courseId}) => ({
        url: `create/${courseId}`,
        method: "POST",
        body: {lectureTitle}
      }),
      invalidatesTags: ["Refetch_Lecture"]
    }),
    getLecture: builder.query({
      query: (courseId) => ({
        url: `course/${courseId}`,
        method: "GET"
      }),
      providesTags: ["Refetch_Lecture"]
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `${lectureId}`,
        method: "GET"
      })
    }),
    removeLecture: builder.mutation({
      query: ({lectureId,courseId}) => ({
        url: `${courseId}/${lectureId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Refetch_Lecture"]
    }),
    updateLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/${lectureId}`,
        method: "PUT",
        body: { lectureTitle, videoInfo, isPreviewFree },
      })
    })
  })
})

export const {
  useCreateLectureMutation,
  useGetLectureQuery,
  useGetLectureByIdQuery,
  useUpdateLectureMutation,
  useRemoveLectureMutation
} = lectureApi