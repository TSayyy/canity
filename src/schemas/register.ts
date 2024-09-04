import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "name must be at least 2 characters").max(50, "name can not exceed 50 characters"),
  email: z.string().min(1, "email can not be empty").email("invalid email address"),
  password: z.string().min(8, "password must be at least 8 characters").max(64, "name can not exceed 64 characters"),
});
