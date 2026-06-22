import { BASE_URL } from "@/app/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = BASE_URL+"course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "create",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["refetch_creator_courses"],
    }),
    getPublishedCourses: builder.query({
      query: () => ({
        url: "published-courses",
        method: "GET",
      }),
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: "",
      }),
      providesTags: ["refetch_creator_courses"],
    }),
    updateCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `update/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["refetch_creator_courses"],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `delete/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refetch_creator_courses"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `${courseId}`,
      }),
      providesTags: ["refetch_it"],
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/publish/${courseId}?publish=${query}`,
        method: "PUT",
      }),
      invalidatesTags: ["refetch_creator_courses", "refetch_it"],
    }),
    getSearchCourse: builder.query({
      query: ({ query = "", categories = [], sortByPrice = "" }) => {
        // Build query string with all search params
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        categories.forEach((cat) => params.append("categories", cat));
        if (sortByPrice) params.append("sortByPrice", sortByPrice);
        return {
          url: `/search?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useUpdateCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useGetPublishedCoursesQuery,
  useGetSearchCourseQuery,
  useDeleteCourseMutation
} = courseApi;
