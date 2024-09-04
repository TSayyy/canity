import { z } from "zod";

import { imageSchema } from "./imageSchema";
import { mentorSchema } from "./mentorSchema";

export const courseChaptersSchema = z.object({
  chapters: z.array(
    z.object({
      chapterName: z.string().min(1, { message: "Title is required" }),
      chapterLink: z.string().url({ message: "Invalid URL" }),
    })
  ),
});
export const basicCourseInfoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  keywords: z.array(z.string()).min(2, "At least 2 keywords are required").max(8, "Maximum 8 keywords are allowed"),
  image: imageSchema,
  trackName: z.string(),
  cLevel: z.literal("Beginner").or(z.literal("Intermediate")).or(z.literal("Hard")).or(z.literal("Advanced")),
  estimatedTime: z.number(),
  noChapters: z.number(),
  price: z.number(),
});

export const courseSchema = z
  .object({
    id: z.string().uuid(),
    publishTime: z.string(),
    progress: z.number(),
    noStudentsEnrolled: z.number(),
    rating: z.number(),
    cLink: z.string(),
    trackID: z.string().uuid(),
    mentor: mentorSchema,
    track: z.object({
      id: z.string().uuid(),
      title: z.string(),
    }),
  })
  .merge(basicCourseInfoSchema)
  .merge(courseChaptersSchema);
