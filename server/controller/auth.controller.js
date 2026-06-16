import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userobj = user.toObject();
    delete userobj.password;

    const token = generateToken(user._id);
    return res.status(201)
    .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24*60*60*1000
              })
    .json({
      success: true,
      message: `Welcome ${name}`,
      user: userobj
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Details",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Details",
      });
    }

    const token = generateToken(user._id);
    const userobj = user.toObject();
    delete userobj.password;
    return res.status(200)
              .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24*60*60*1000
              })
              .json({
                success:true,
                message: `Welcome Back ${user.name}`,
                user: userobj
              })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to login" + error.message,
    });
  }
};

export const logoutUser = async (req,res) => {
  try {
    res.cookie("token",null,{
      expires: new Date(Date.now())
    })
    .json({
      success: true,
      message: "logged out successfully"
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to logout" + error.message,
    });
  }
}