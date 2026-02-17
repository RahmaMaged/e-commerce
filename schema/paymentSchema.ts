import * as z from "zod";

export const paymentSchema = z.object({
  details: z.string().nonempty("Enter the details"),

  city: z.string().nonempty("Enter your city"),
  phone: z
    .string()
    .nonempty("Enter your phone")
    .regex(/^01[0125][0-9]{8}$/),
  type: z.string().nonempty("Select a payment method"),
});

export type paymentDataType = z.infer<typeof paymentSchema>;
