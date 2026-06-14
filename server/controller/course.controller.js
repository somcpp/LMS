import { Course } from "../models/course.model.js";
import { deletePhoto, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false ,
        message: "Course title and category is required"
      })
    }
    const newCourse = new Course({
      courseTitle,
      category,
      creator: req.id,
    });
    await newCourse.save();
    return res.status(201).json({
      newCourse,
      message: "Course Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course" + error,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deletePhoto(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    const updatedData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};

export const getCourseById = async(req,res) => {
  try {
    const {courseId} = req.params;
    // if (!mongoose.Types.ObjectId.isValid(courseId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid Course ID format",
    //   });
    // }
    const course = await Course.findById(courseId);
    if(!course) {
      return res.status(400).json({
        success:false,
        message: "Course Not Found"
      })
    }
    return res.status(200).json({
      success: true,
      course
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get this Course details"
    })
  }
}

export const togglePublishCourse = async(req,res) => {
  try {
    const {courseId} = req.params;
    const {publish} = req.query;
    const course = await Course.findById(courseId);
    if(!course) {
      return res.status(400).json({
        message: "course not found!"
      })
    }

    course.isPublished = publish === "true"
    await course.save();
    const statusMessage = course.isPublished? "Course Published" : "Course Unpublished";
    return res.status(200).json({
      success: true,
      message: statusMessage
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status"
    })
  }
}