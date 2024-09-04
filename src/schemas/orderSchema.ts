import { z } from "zod";

import { BasicInfoFormSchema, ProSectionSchema, SocialMediaSchema } from "./mentorSchema";

export const orderSchema = z
  .object({ status: z.enum(["rejected", "pending", "accepted"]), id: z.string(), language: z.string() })
  .merge(BasicInfoFormSchema)
  .merge(ProSectionSchema)
  .merge(SocialMediaSchema);
