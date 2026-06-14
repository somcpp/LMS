import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card'


import React from 'react'
import { Link } from 'react-router-dom';

const CourseCard = ({course}) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
    <Card className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  <img
    src={course.courseThumbnail}
    alt="course"
    className="w-full h-32 object-cover"
  />

  <CardContent className="p-3">
    <div className="flex items-start justify-between gap-2">
      <h2 className="font-semibold text-sm line-clamp-2 flex-1">
        {course.courseTitle}
      </h2>

      <Badge className="bg-blue-600 text-white text-[10px] px-2 py-0.5 shrink-0">
        {course.courseLevel}
      </Badge>
    </div>

    <div className="flex items-center gap-2 mt-3">
      <Avatar className="h-7 w-7">
        <AvatarImage
          src={
            course.creator?.photoURL ||
            "https://github.com/shadcn.png"
          }
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <span className="text-xs text-muted-foreground truncate">
        {course.creator?.name}
      </span>
    </div>

    <div className="mt-3 flex justify-between items-center">
      <span className="font-bold text-lg">
        ₹{course.coursePrice}
      </span>
    </div>
  </CardContent>
</Card>
    </Link>
  );
}

export default CourseCard