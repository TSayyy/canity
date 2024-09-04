import { z } from "zod";

import { courseSchema } from "./courseSchema";

export const wishlistResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  courses: z.array(
    z.object({
      courseId: z.string().uuid(),
      wishlistId: z.string().uuid(),
      course: courseSchema,
    })
  ),
});
