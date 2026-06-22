import React, { useEffect, useState } from 'react';
import { useGetLectureByIdQuery, useRemoveLectureMutation, useUpdateLectureMutation } from '@/api/lectureApi';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';

const LectureTab = () => {
  const params = useParams();
  const { courseId, lectureId } = params;

  const [lectureTitle, setLectureTitle] = useState("");
  const [isFree, setIsFree] = useState(false);
  
  // NEW/UPDATED STATES
  const [selectedFile, setSelectedFile] = useState(null); // Stores the local file object
  const [existingVideoInfo, setExistingVideoInfo] = useState(null); // Stores the server-returned video object
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // RTK Query hooks
  const [updateLecture, { data: updateData, isLoading: updateLoading, error: updateError, isSuccess: updateIsSuccess }] = useUpdateLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  // Sync state with fetched data
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle || "");
      setIsFree(lecture.isPreviewFree || false);
      setExistingVideoInfo(lecture.videoInfo || null);
    }
  }, [lecture]);

  const MEDIA_API = "http://localhost:8080/api/media/upload";

  // 1. Only capture the file locally, do NOT upload yet
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // 2. Handle the whole process on Submit
  const editLectureHandler = async () => {
    let finalVideoInfo = existingVideoInfo; 

    // If the user selected a new local file, upload it now
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      setIsUploading(true);
      setUploadProgress(0);

      try {
        const res = await axios.post(MEDIA_API, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          }
        });

        if (res.data.success) {
          finalVideoInfo = {
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          };
          toast.success("Video processing complete!");
        } else {
          toast.error("Failed to process video on storage server");
          setIsUploading(false);
          return; // Stop execution if upload failed
        }
      } catch (error) {
        toast.error("Video cloud upload failed");
        setIsUploading(false);
        return; // Stop execution
      } finally {
        setIsUploading(false);
      }
    }

    // Pass either the newly uploaded video details or the old ones if un-changed
    await updateLecture({
      lectureTitle,
      videoInfo: finalVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture({ lectureId, courseId });
  };

  // Toast Notifications
  useEffect(() => {
    if (updateIsSuccess) {
      toast.success(updateData?.message || "Lecture updated successfully");
      setSelectedFile(null); // Reset file input track
    }
    if (updateError) {
      toast.error(updateError?.data?.message || "Failed to update lecture");
    }
  }, [updateIsSuccess, updateError, updateData]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success("Lecture removed successfully");
    }
  }, [removeSuccess, removeData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <Label htmlFor="lecture-title">Title</Label>
          <Input
            id="lecture-title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        
        <div className="my-5 space-y-1">
          <Label htmlFor="lecture-video">
            Video {!existingVideoInfo && <span className="text-red-500">*</span>}
          </Label>
          <Input
            id="lecture-video"
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
          />
          {existingVideoInfo && !selectedFile && (
            <p className="text-xs text-green-600 mt-1">✔ Current video is loaded and active</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="preview-mode" />
          <Label htmlFor="preview-mode">Is this video FREE</Label>
        </div>

        {isUploading && (
          <div className="my-4 space-y-1">
            <Progress value={uploadProgress} />
            <p className="text-sm text-muted-foreground">{uploadProgress}% uploaded to cloud...</p>
          </div>
        )}

        <div className="mt-4">
          {/* Button disables if either video is processing OR RTK Query is mutating database */}
          <Button disabled={updateLoading || isUploading} onClick={editLectureHandler}>
            {updateLoading || isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isUploading ? "Uploading Video..." : "Saving Changes..."}
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;