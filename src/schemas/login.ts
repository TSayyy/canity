import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "email can not be empty").email("invalid email address"),
  password: z.string().min(1, "password can not be empty"),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  data: z.object({
    email: z.string().email(),
    id: z.string().uuid(),
    name: z.string(),
    role: z.union([z.literal("student"), z.literal("mentor"), z.literal("admin"), z.literal(undefined)]),
    image: z.string().url(),
    age: z.union([z.number().int().positive(), z.null()]).optional(),
    gender: z.union([z.literal("male"), z.literal("female"), z.null()]).optional(),
    country: z.union([z.string(), z.null()]).optional(),
    city: z.union([z.string(), z.null()]).optional(),
    bio: z.union([z.string(), z.null()]).optional(),
  }),
});
