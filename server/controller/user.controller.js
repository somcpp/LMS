import { User } from "../models/user.model.js";
import { deletePhoto, uploadMedia } from "../utils/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if(!user) {
      return res.status(404).json({
        message:"Profile not found",
        success: false
      })
    }
    return res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const updateProfile = async (req,res) => {
  try {
    const userId = req.id;
    const {name} = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    
    const updatedData = {};
    if(name) {
      updatedData.name = name;
    }

    if(profilePhoto) {
      if(user.photoURL) {
        const publicId = user.photoURL
                              .split("/")
                              .pop()
                              .split('.')[0];

        await deletePhoto(publicId);
      }

      const cloundResponse = await uploadMedia(profilePhoto.path);
      updatedData.photoURL = cloundResponse.secure_url
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
    ).select("-password");

    return res.status(200).json({
        success: true,
        user: updatedUser,
        message: "Profile updated successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile"
    })
  }
}
