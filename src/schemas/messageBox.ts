import { z } from "zod";

export const messageBoxSchema = z.object({
  text: z.string(),
  image: z.string().optional(),
});
