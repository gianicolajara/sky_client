import { z } from "zod";
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is invalid",
    })
    .min(3, { message: "Name must be at least 3 characters" }),
  lastname: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname is invalid",
    })
    .min(3, { message: "Lastname must be at least 3 characters" }),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is invalid",
    })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is invalid",
    })
    .regex(
      passwordValidation,
      "Password must be strong, at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    ),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
