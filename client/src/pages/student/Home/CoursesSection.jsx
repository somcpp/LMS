import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCoursesQuery } from "@/api/courseApi";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const {data, isLoading, isSuccess} = useGetPublishedCoursesQuery();
  console.log(data);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-center font-bold text-2xl">Our Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          : (
            data?.courses.length!==0 && data.courses.map((course,index) => <CourseCard key={index} course={course}/>)
          )}
      </div>
      </div>
    </div>
  );
};

export default CoursesSection;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm max-w-sm animate-pulse">
      
      {/* Shorter image height */}
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-700" />
      
      {/* Tighter padding and gap spacing */}
      <div className="p-3.5 space-y-3">
        {/* Thinner title line */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        
        {/* Compact row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Smaller avatar */}
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
            {/* Shorter text */}
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-14" />
          </div>
          
          <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded-full w-12" />
        </div>
        
        {/* Price tag */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5" />
      </div>
    </div>
  );
};