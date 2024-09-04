import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "email can not be empty").email("invalid email address"),
});
