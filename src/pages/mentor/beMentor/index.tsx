import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { usePatchData, usePostData } from "@/hooks/useApi";
import { BasicInfoFormSchema, ProSectionSchema, SocialMediaSchema } from "@/schemas/mentorSchema";

import { ContactForm } from "./components/ContactForm";
import { EducationForm } from "./components/EducationForm";
import { InfoForm } from "./components/InfoForm";

const STEPS = [
  {
    number: 1,
    title: "Basic info",
    description: "Basic information ",
  },
  {
    number: 2,
    title: "Education",
    description: "Education ",
  },
  {
    number: 3,
    title: "Contact info",
    description: "Contact information ",
  },
];

export default function BeMentorForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<z.infer<typeof BasicInfoFormSchema>>({
    image: undefined,
    name: "",
    email: "",
    phoneNumber: "",
    dob: new Date(),
    country: "",
    city: "",
    languages: [],
  });
  const [educationInfo, setEducationInfo] = useState<z.infer<typeof ProSectionSchema>>({
    workExp: "",
    education: "",
    experience: "",
    about: "",
    title: "",
    resume: undefined,
    pricePerHour: 0,
    trackName: "",
  });
  const [contactInfo, setContactInfo] = useState<z.infer<typeof SocialMediaSchema>>({
    facebook: "",
    linkedIn: "",
    github: "",
  });

  const sendApplication = usePostData("/users/upgrade");
  const sendResume = usePatchData("applications/upload/cv", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const sendImage = usePatchData("applications/upload/image", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const handleBasicInfo = (data: z.infer<typeof BasicInfoFormSchema>) => {
    setBasicInfo(data);
    setCurrentStep((prev) => prev + 1);
    setPrevStep(1);
  };

  const handleEducationInfo = (data: z.infer<typeof ProSectionSchema>) => {
    setEducationInfo(data);
    setCurrentStep((prev) => prev + 1);
    setPrevStep(2);
  };

  const handleSubmit = async (data: z.infer<typeof SocialMediaSchema>) => {
    setContactInfo(data);
    const toastId = toast.loading("Sending your application...");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { workExp, languages, ...mentorData } = {
      ...basicInfo,
      ...educationInfo,
      ...data,
      experience: Number(educationInfo.experience),
      workExperience: educationInfo.workExp,
      language: basicInfo.languages.join(","),
    };
    delete mentorData.resume;
    delete mentorData.image;
    const { status, data: response } = await sendApplication.mutateAsync(mentorData);
    console.log(response, mentorData);
    if (status === "failed" || response?.status === "failed") {
      toast.error("Failed to send your application, please try again later.", { id: toastId });
      return;
    }

    const resume = new FormData();
    resume.append("cv", educationInfo?.resume as Blob);
    const { status: resumeStatus } = await sendResume.mutateAsync(resume);
    if (resumeStatus === "failed") {
      toast.error("Failed to send your resume, please try again later.");
    }

    const image = new FormData();
    image.append("image", basicInfo?.image as Blob);
    const { status: imageStatus } = await sendImage.mutateAsync(image);
    if (imageStatus === "failed") {
      toast.error("Failed to send your image, please try again later.");
    }
    toast.success("your application has been sent successfully.", { id: toastId });
    navigate("/");
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => {
      setPrevStep(prev);
      return prev - 1;
    });
  };

  return (
    <main className=" container  py-10 flex flex-col justify-center items-center gap-20">
      <header className=" container flex justify-center items-center gap-4">
        {STEPS.map((step, index) => (
          <Fragment key={step.title}>
            <div className={`relative flex flex-col justify-center items-center gap-2`}>
              <span
                className={` text-white rounded-full py-1 px-3 flex justify-center items-center transition-colors duration-700 ${currentStep < index ? "bg-zinc-300" : "bg-royal-blue"}`}
              >
                {step.number}
              </span>
              <span
                className={`absolute top-10 whitespace-nowrap transition-colors duration-300 ${currentStep < index ? "text-zinc-300" : ""} `}
              >
                {step.title}
              </span>
            </div>
            <hr
              className={`max-w-64 w-12 xs:w-64 min-w-0 h-0.5 rounded-full last:hidden transition-colors duration-300  ${currentStep > index ? " bg-royal-blue" : " bg-zinc-300"}`}
            />
          </Fragment>
        ))}
      </header>
      <section className="bg-gray-100 flex flex-col rounded-2xl p-8 space-y-8 w-full transition-all min-h-[550px] max-w-screen-xl  overflow-hidden">
        <header>
          <h1 className="text-2xl font-semibold"> {STEPS[currentStep]?.description} </h1>
        </header>
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
              <InfoForm data={basicInfo} onNext={handleBasicInfo} />
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
              <EducationForm data={educationInfo} onPrevious={handlePrevious} onNext={handleEducationInfo} />
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
              <ContactForm data={contactInfo} onNext={handleSubmit} onPrevious={handlePrevious} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
