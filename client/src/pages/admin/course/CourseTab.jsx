import RichTextEditor from "@/components/RichTextEditor";
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
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useUpdateCourseMutation,
} from "@/api/courseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CourseTab = () => {
  const [isPublished, setIspublished] = useState(false);
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate(); // 🔥 FIX: Added missing navigate initialization

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [updateCourse, { data, isLoading, isSuccess, error }] =
    useUpdateCourseMutation();
  const [publishCourse, {data:publishData, isLoading: publishLoading, isSuccess: publishSuccess}] = usePublishCourseMutation();
    
  const {
    data: courseData,
    isLoading: courseLoading,
    isSuccess: getCourseSuccess,
  } = useGetCourseByIdQuery(courseId, { skip: !courseId });

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  
  useEffect(() => {

  if (courseData?.course) {
    setInput({
      courseTitle: courseData.course.courseTitle || "",
      subTitle: courseData.course.subTitle || "",
      description: courseData.course.description || "",
      category: courseData.course.category || "",
      courseLevel: courseData.course.courseLevel || "",
      coursePrice: courseData.course.coursePrice || "",
    });
    setPreviewThumbnail(courseData.course.courseThumbnail)
    setIspublished(courseData.course.isPublished);
  }
}, [courseData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });
    await updateCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update Course");
    }
  }, [isSuccess, error]);

  // Optional: Prevent flashing empty inputs while loading the data initially
  if (courseLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const handlePublish = async() => {
    try {
      await publishCourse({courseId,query: !isPublished}).unwrap();
      setIspublished(!isPublished);
      if(publishSuccess) {
      toast.success(publishData.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
    
  }

  return (
    <Card className={"mt-2"}>
      <CardHeader className={"flex justify-between"}>
        <div>
          <CardTitle>Basic Course information</CardTitle>
          <CardDescription>
            Make changes to your courses here. click save when you are done
          </CardDescription>
        </div>
        <div>
          <Button variant="outline" onClick={handlePublish} 
            disabled={courseData.course.lectures.length===0}
          >
            {publishLoading?
             "publishing..." : isPublished ? "Unpublish" : "publish"
            }
            
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mt-5">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Eg. Fullstack Dev"
          />
        </div>
        <div className="space-y-2 mt-5">
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Eg. Master full stack dev"
          />
        </div>
        <div className="space-y-2 mt-5">
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        <div className="flex items-center gap-5 space-y-5 mt-5">
          <div className="space-y-2">
            <Label>Category</Label>
            {/* 🔥 FIX: Changed defaultValue to value */}
            <Select
              value={input.category} 
              onValueChange={selectCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="Fullstack Development">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN Stack Development">
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Course Level</Label>
            {/* 🔥 FIX: Changed defaultValue to value */}
            <Select
              value={input.courseLevel}
              onValueChange={selectCourseLevel}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" space-y-2 mb-5">
            <Label>Price in (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="199"
              className="w-fit"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit mb-3"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-64 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>

        <div className="space-x-2">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={updateCourseHandler}
            className={"hover:cursor-pointer"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;