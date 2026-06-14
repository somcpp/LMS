import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const mediaRouter = express.Router();

mediaRouter.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      console.log("req.file:", req.file);
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded.",
        });
      }
      const result = await uploadMedia(req.file.path);
      console.log(req.file.path);
      res.status(200).json({
        success: true,
        message: "File uploaded successfully.",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error uploading file" });
    }
  }
);

export default mediaRouter;

