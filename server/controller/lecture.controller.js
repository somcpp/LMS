import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/course.model.js";
import { deleteVideo } from "../utils/cloudinary.js";

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    console.log(req.body, lectureTitle);
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Lecture could not be created",
    });
  }
};

export const getLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(400).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { lectureId, courseId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(400).json({
        message: "Lecture not found!",
      });
    }
    //update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    //Ensure the course still has the lecture id if it was not already added
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update lectures",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId, courseId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    // delete the lecture from the cloudinary as well
    if (lecture.publicId) {
      await deleteVideo(lecture.publicId);
    }
    // remove the lecture ref from associated course
    await Course.findByIdAndUpdate(courseId, {
      $pull: { lectures: lectureId },
    });
    return res.status(200).json({
      success: true,
      message:
        "Lecture removed successfully from both database and course reference.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to remove the lecture.",
      error: error.message,
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    console.log(lectureId);
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(400).json({
        message: "Lecture not found",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};
