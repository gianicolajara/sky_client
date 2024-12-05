import { z } from "zod";
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const LoginSchema = z.object({
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

export type LoginSchemaType = z.infer<typeof LoginSchema>;
