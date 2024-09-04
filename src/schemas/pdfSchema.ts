import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
function checkFileType(file: File) {
  if (!file) return false;
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}

export const pdfSchema = z.union([
  z
    .any()
    .refine((file: File) => file?.size > 0, "File is required")
    .refine((file) => file?.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine((file) => checkFileType(file), "Only .pdf, .docx formats are supported."),
  z.string().url(),
]);
