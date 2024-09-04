import { z } from "zod";

import { imageSchema } from "./imageSchema";
import { pdfSchema } from "./pdfSchema";
import { sessionSchema } from "./sessionSchema";
import { userSchema } from "./userSchema";

export const MentorAvailabilitySchema = z.object({
  id: z.string().uuid(),
  mentorID: z.string().uuid(),
  date: z.date(),
  startTime: z.number(),
  endTime: z.number(),
  isBooked: z.boolean(),
});

export const mentorSchema = z.object({
  id: z.string().uuid(),
  mentorID: z.string().uuid(),
  noStudents: z.number(),
  pricePerHour: z.number(),
  rating: z.number(),
  title: z.string(),
  about: z.string(),
  experience: z.number(),
  skills: z.array(z.string()),
  resume: z.string(),
  education: z.string(),
  workExperience: z.string(),
  linkedIn: z.string(),
  gitHub: z.string(),
  facebook: z.string(),
  twitter: z.string(),
  languages: z.array(z.string()),
  trackID: z.string().uuid(),
  location: z.string(),
  timeZones: z.string(),
  user: userSchema,
  track: z.object({ name: z.string(), id: z.string().uuid(), title: z.string() }),
  availability: z.array(MentorAvailabilitySchema),
  sessions: z.array(sessionSchema),
  visits: z.array(z.object({ date: z.date(), visits: z.number() })),
  Visit: z.record(z.number()),
});

export const BasicInfoFormSchema = z.object({
  image: imageSchema,
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Name is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" }),
  phoneNumber: z
    .string()
    .min(8, { message: "Mobile number is required" })
    .max(100, { message: "Mobile number is too long" }),
  dob: z.coerce.date({
    required_error: "A date of birth is required.",
  }),

  country: z.string().min(1, { message: "Country is required" }).max(100, { message: "Country is too long" }),
  city: z.string().min(1, { message: "City is required" }).max(100, { message: "City is too long" }),
  languages: z.array(z.string()).min(1, { message: "Languages are required" }),
});

export const ProSectionSchema = z.object({
  workExp: z
    .string()
    .min(1, { message: "Work experience is required" })
    .max(1000, { message: "Work experience is too long" }),
  education: z.string().min(1, { message: "Education is required" }).max(100, { message: "Education is too long" }),
  experience: z.union([
    z.string().min(1, { message: "Experience is required" }).max(100, { message: "Experience is too long" }),
    z.number(),
  ]),
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title is too long" }),
  about: z.string().min(1, { message: "About is required" }).max(1000, { message: "About is too long" }),
  pricePerHour: z.number().min(10, { message: "Price per hour can not be less than 10$" }),
  trackName: z.string().min(1, { message: "Track name is required" }).max(100, { message: "Track name is too long" }),
  resume: pdfSchema,
});

export const SocialMediaSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email is too long" })
    .email({ message: "Invalid email" })
    .optional(),
  linkedIn: z.string().optional(),
  facebook: z.string().optional(),
  github: z.string().optional(),
  x: z.string().optional(),
});
export const selectMentorFormSchema = z.object({
  mentorId: z.string().uuid(),
});
