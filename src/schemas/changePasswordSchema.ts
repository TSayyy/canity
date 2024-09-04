import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().max(64, "password can not exceed 64 characters"),
    newPassword: z.string().max(64, "password can not exceed 64 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword.length === 0 || data.newPassword.length > 8, {
    message: "password must be at least 8 characters",
    path: ["newPassword"],
  })
  .refine(
    (data) => {
      if (data.newPassword.length === 0) return true;
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "passwords do not match",
      path: ["confirmPassword"],
    }
  );
