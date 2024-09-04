import { v4 as uuid } from "uuid";

import ThamerAlSaiadImage from "@/assets/mentors/mentorT.webp";
import resume from "@/assets/mentors/Resume_Template.pdf";

export const mentor = {
  id: uuid(),
  name: "Thamer AlSaiad",
  jobTitle: "Front End Developer",
  description:
    "Junior Frontend Engineer | Web Freelancer | Passionate about React and TypeScript 💙 | University Student ",
  image: ThamerAlSaiadImage,
  price: 100,
  skills: [
    { id: uuid(), name: "ReactJS" },
    { id: uuid(), name: "TypeScript" },
    { id: uuid(), name: "Front End" },
    { id: uuid(), name: "JavaScript" },
    { id: uuid(), name: "Node.js" },
    { id: uuid(), name: "Spring Boot" },
    { id: uuid(), name: "Python" },
    { id: uuid(), name: "Django" },
  ],
  workExperience:
    "Freelancing | Personal Projects",
  education: "Student at the Syrian Private University",
  jobExperience: "Junior",
  rating: 5.0,
  languages: ["English", "Arabic"],
  location: "Syria",
  timeZones: "GMT +3",
  resume: resume,
};
