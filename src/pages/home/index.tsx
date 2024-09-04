import { z } from "zod";

import { useGetData } from "@/hooks/useApi";
import { courseSchema } from "@/schemas/courseSchema";
import { mentorSchema } from "@/schemas/mentorSchema";
import { trackSchema } from "@/schemas/trackSchema";

import { BeMentor } from "./BeMentor";
import CourseSection from "./CourseSection";
import HeroSection from "./HeroSection";
import MentorSection from "./MentorSection";
import TrackSection from "./TrackSection";

export const HomePage = () => {
  const { data } = useGetData("/home");
  const { courses, mentors, tracks } = data?.data || {};
  return (
    <div className=" w-full overflow-x-hidden">
      <HeroSection />
      <TrackSection tracks={tracks as z.infer<typeof trackSchema>[]} />
      <MentorSection mentors={mentors as z.infer<typeof mentorSchema>[]} />
      <CourseSection courses={courses as z.infer<typeof courseSchema>[]} />
      <BeMentor />
    </div>
  );
};
