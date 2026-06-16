import {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
} from "@/api/courseProgressApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  CheckCircle2,
  CirclePlay,
  Loader2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ReactPlayer from 'react-player'

const CourseProgress = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress, { isLoading: isUpdating }] =
    useUpdateLectureProgressMutation();

  // Set initial lecture once data loads
  useEffect(() => {
    if (data?.courseDetails?.lectures?.length > 0 && !currentLecture) {
      setCurrentLecture(data.courseDetails.lectures[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load course details</p>
      </div>
    );
  }

  const { courseDetails, progress, completed } = data;
  const { courseTitle, lectures } = courseDetails;

  // Find the first lecture that has a video (fallback for initial load)
  const initialLecture =
    lectures?.find((lec) => lec.videoUrl) || lectures?.[0];
  const activeLecture = currentLecture || initialLecture;

  const isLectureCompleted = (lectureId) => {
    return progress?.some(
      (p) => p.lectureId === lectureId && p.viewed
    );
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const handleToggleLectureComplete = async (lectureId) => {
    try {
      await updateLectureProgress({ courseId, lectureId }).unwrap();
      refetch();
      toast.success(
        isLectureCompleted(lectureId)
          ? "Lecture marked as incomplete"
          : "Lecture marked as complete"
      );
    } catch (err) {
      toast.error("Failed to update lecture progress");
    }
  };

  const handleVideoEnded = () => {
    if (activeLecture && !isLectureCompleted(activeLecture._id)) {
      handleToggleLectureComplete(activeLecture._id);
    }
  };

  const currentIndex = lectures?.findIndex(
    (lec) => lec._id === activeLecture?._id
  );

  const completedCount = progress?.filter((p) => p.viewed).length || 0;
  const totalLectures = lectures?.length || 0;
  const progressPercent =
    totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Course Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{courseTitle}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {completedCount} of {totalLectures} lectures completed
          </p>
        </div>
        {completed && (
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            <span>Course Completed</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
          {progressPercent}% complete
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Video Section (Left) */}
        <div className="flex-1 lg:w-3/5">
          <div className="rounded-xl overflow-hidden shadow-lg bg-black">
            {activeLecture?.videoUrl ? (
              <ReactPlayer
                key={activeLecture._id}
                src={activeLecture.videoUrl}
                controls={true}
                width="100%"
                height="400px"
                onEnded={handleVideoEnded}
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center bg-gray-900">
                <p className="text-gray-400 text-lg">
                  No video available for this lecture
                </p>
              </div>
            )}
          </div>

          {/* Current Lecture Info */}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold text-xl">
                {`Lecture ${(currentIndex ?? 0) + 1}: ${
                  activeLecture?.lectureTitle || "Untitled"
                }`}
              </h3>
            </div>
            {activeLecture && (
              <Button
                size="sm"
                variant={
                  isLectureCompleted(activeLecture._id)
                    ? "outline"
                    : "default"
                }
                onClick={() =>
                  handleToggleLectureComplete(activeLecture._id)
                }
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : isLectureCompleted(activeLecture._id) ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : null}
                {isLectureCompleted(activeLecture._id)
                  ? "Completed"
                  : "Mark as Complete"}
              </Button>
            )}
          </div>
        </div>

        {/* Lecture Sidebar (Right) */}
        <div className="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 lg:pl-6 pt-4 lg:pt-0">
          <h2 className="font-semibold text-xl mb-4">
            Course Lectures
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-280px)] space-y-3 pr-1">
            {lectures?.map((lecture, idx) => (
              <Card
                key={lecture._id}
                className={`hover:cursor-pointer transition-all duration-200 hover:shadow-md ${
                  lecture._id === activeLecture?._id
                    ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 ring-1 ring-blue-300 dark:ring-blue-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-gray-400 font-mono w-5 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2
                        size={22}
                        className="text-green-500 shrink-0"
                      />
                    ) : (
                      <CirclePlay
                        size={22}
                        className={`shrink-0 ${
                          lecture._id === activeLecture?._id
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                    <div className="min-w-0">
                      <CardTitle className="text-sm font-medium truncate">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant="outline"
                      className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-300 dark:border-green-700 text-xs shrink-0 ml-2"
                    >
                      Done
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;