import { z } from "zod";
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const updateSchema = z.object({
  id: z.string({}),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is invalid",
    })
    .optional(),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname is invalid",
    })
    .optional(),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is invalid",
    })
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email({
      message: "Email is invalid",
    })
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is invalid",
    })
    .regex(
      passwordValidation,
      "Password must be strong, at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    )
    .optional(),
});

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const updateAvatarSchema = z.object({
  avatar: z
    .unknown()
    .transform((value) => {
      return value as File | undefined;
    })
    .refine(
      (file) =>
        file &&
        ACCEPTED_IMAGE_TYPES.includes(file.type) &&
        file.size <= MAX_FILE_SIZE,
      {
        message: "The file is not valid, just jpg, png and less than 1mb",
      }
    ),
});

export type UpdateAvatarSchemaType = z.infer<typeof updateAvatarSchema>;

export type UpdateSchemaType = z.infer<typeof updateSchema>;
