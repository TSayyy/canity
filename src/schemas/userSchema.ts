import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  authStatus: z.boolean(),
  role: z.union([z.literal("student"), z.literal("mentor"), z.literal("admin"), z.literal(undefined)]),
  image: z.string().url(),
  age: z.union([z.number().int().positive(), z.null()]).optional(),
  dob: z.union([z.date(), z.null()]).optional(),
  gender: z.union([z.literal("male"), z.literal("female"), z.null()]).optional(),
  phoneNumber: z.string().max(100, { message: "Mobile number is too long" }).optional(),
  country: z.union([z.string(), z.null()]).optional(),
  city: z.union([z.string(), z.null()]).optional(),
  bio: z.union([z.string(), z.null()]).optional(),
});
