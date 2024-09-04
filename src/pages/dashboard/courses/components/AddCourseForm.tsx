import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

import { globalResponseFormat, patchRequest, usePostData } from "@/hooks/useApi";
import { basicCourseInfoSchema, courseChaptersSchema, courseSchema } from "@/schemas/courseSchema";
import { selectMentorFormSchema } from "@/schemas/mentorSchema";

import { CourseChaptersForm } from "./CourseChaptersForm";
import { CourseInfoForm } from "./CourseInfoForm";
import SelectMentorForm from "./SelectMentorForm";

export function AddCourseForm({ onCloseModal }: { onCloseModal?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [courseInfo, setCourseInfo] = useState<z.infer<typeof basicCourseInfoSchema>>();
  const [courseChapters, setCourseChapters] = useState<z.infer<typeof courseChaptersSchema>>();
  const [mentorId, setMentorId] = useState<string | undefined>();
  const createCourse = usePostData("admin/courses");

  function handlePrev() {
    setCurrentStep((prev) => prev - 1);
    setPrevStep(currentStep);
  }

  function handleCourseInfo(data: z.infer<typeof basicCourseInfoSchema>) {
    setCourseInfo(data);
    setCurrentStep((prev) => prev + 1);
    setPrevStep(currentStep);
  }

  function handleCourseChapters(data: z.infer<typeof courseChaptersSchema>) {
    setCourseChapters(data);
    setCurrentStep((prev) => prev + 1);
    setPrevStep(currentStep);
  }

  async function handleSubmit(data: z.infer<typeof selectMentorFormSchema>) {
    // store mentor id
    setMentorId(data.mentorId);

    // update course info
    const toastId = toast.loading("Creating New Course...");

    const newCourse = {
      mentorId: data.mentorId,
      ...courseInfo,
      chapters: courseChapters?.chapters,
      track: courseInfo?.trackName,
    };
    delete newCourse.image;
    delete newCourse.trackName;
    const { status, data: res } = await createCourse.mutateAsync(newCourse);
    const { course }: { course: z.infer<typeof courseSchema> } = res || {};

    // Upload course image
    const file = new FormData();
    file.append("image", courseInfo?.image);
    const ImageRes = await patchRequest(`/admin/courses/upload/image/${course.id}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { status: imageStatus, data: imageRes } = globalResponseFormat(ImageRes);
    if (imageStatus !== "success") {
      console.log(imageRes);
      toast.error("Failed to upload course image");
    }

    // check if course was created successfully
    if (status === "success") {
      toast.success("Course created successfully", { id: toastId });
      onCloseModal?.();
    } else {
      toast.error("Failed to create course", { id: toastId });
    }
  }
  return (
    <main>
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key={currentStep}
            className="w-full grow"
            initial={{ x: "-100vw", width: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ duration: 0.3 }}
          >
            <CourseInfoForm handleCourseInfo={handleCourseInfo} data={courseInfo} />
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            key={currentStep}
            className="w-full grow"
            initial={{ x: `${currentStep < prevStep ? "-" : ""}100vw`, width: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: `${currentStep < prevStep ? "" : "-"}100vw` }}
            transition={{ duration: 0.3 }}
          >
            <CourseChaptersForm
              noChapters={courseInfo?.noChapters || 1}
              handleCourseChapters={handleCourseChapters}
              onPrev={handlePrev}
            />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            key={currentStep}
            className="w-full grow"
            initial={{ x: "100vw", width: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.3 }}
          >
            <SelectMentorForm mentorId={mentorId} handleSubmit={handleSubmit} onPrev={handlePrev} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
