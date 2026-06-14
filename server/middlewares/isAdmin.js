import { User } from "../models/user.model";

export const isAdmin = (req,res,next) => {
  try {
    const userId = req.id;
    const user = User.findById(userId);
    const {role} = user;
    if(role !== "instructor") {
      return res.status(403).json({
        success: false,
        message: "This action requries admin previleges"
      })
    }
    next();
  } catch (error) {
    console.log(error);
  }
}