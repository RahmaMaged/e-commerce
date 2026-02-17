import { signUpSchema } from "@/schema/signUpschema";
import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty("Enter your name")
      .min(3, "Name must be at least 3 letters")
      .max(50),
    email: z.email("Enter a valid email").nonempty("Enter an email"),
    phone: z
      .string()
      .nonempty("Enter your name")
      .regex(/^01[0125][0-9]{8}$/),
    password: z
      .string()
      .nonempty("Enter a password")
      .min(8, "Password must be at least 8 characters"),
    rePassword: z.string().nonempty("Confirm the password"),
  })
  .refine((data) => data.password == data.rePassword, {
    path: ["rePassword"],
    error: "the confirmation is not correct",
  });

export type signUpDataType = z.infer<typeof signUpSchema>;
