import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string().uuid(),
  date: z.date(),
  startTime: z.number(),
  endTime: z.number(),
  student: z.object({ name: z.string() }),
  mentor: z.object({ name: z.string() }),
  status: z.string(),
});
