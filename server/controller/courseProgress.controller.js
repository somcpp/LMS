import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;
    // step-1 fetch the user course Progress
    const progress = await CourseProgress.findOne({ courseId, userId });
    const courseDetails = await Course.findById(courseId).populate("lectures");
    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (!progress) {
      return res.status(200).json({
        courseDetails,
        progress: [],
        completed: false,
      });
    }

    return res.status(200).json({
      courseDetails,
      progress: progress.lectureProgress,
      completed: progress.completed,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // Find progress by courseId and userId (not lectureId)
    let courseProgress = await CourseProgress.findOne({ courseId, userId });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    const lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // Toggle: if already viewed, mark as not viewed (un-complete)
      courseProgress.lectureProgress[lectureIndex].viewed =
        !courseProgress.lectureProgress[lectureIndex].viewed;
    } else {
      // Add new lecture progress entry
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // Recalculate overall course completion based on viewed lectures
    const courseDetails = await Course.findById(courseId);
    const totalLectures = courseDetails.lectures.length;
    const viewedLectures = courseProgress.lectureProgress.filter(
      (lp) => lp.viewed
    ).length;

    courseProgress.completed = viewedLectures === totalLectures;

    await courseProgress.save();

    return res.status(200).json({
      message: courseProgress.lectureProgress.find(
        (lp) => lp.lectureId === lectureId
      )?.viewed
        ? "Lecture marked as complete"
        : "Lecture marked as incomplete",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong while updating",
    });
  }
};
