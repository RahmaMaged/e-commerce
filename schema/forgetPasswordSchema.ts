import * as z from "zod";

export const forgetPasswordSchema = z.object({
  email: z.email("Enter a valid email").nonempty("Enter an email"),
});

export type forgetPasswordDataType = z.infer<typeof forgetPasswordSchema>;
