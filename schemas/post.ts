import { z } from "zod";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const postSchema = z.object({
  title: z
    .string({
      invalid_type_error: "The title is not valid",
      required_error: "The title is required",
    })
    .min(3, { message: "The title must be at least 3 characters" }),
  content: z
    .string({
      invalid_type_error: "The content is not valid",
      required_error: "The content is required",
    })
    .min(3, { message: "The content must be at least 3 characters" }),
  postMedia: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .refine(
      (files) =>
        files.length > 0 &&
        files.length <= 3 &&
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ) &&
        Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "The file is not valid, just jpg, png and less than 1mb",
      }
    ),
});

export type CreatePostType = z.infer<typeof postSchema>;
