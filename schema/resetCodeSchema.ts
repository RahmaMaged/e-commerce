import * as z from "zod";

export const resetCodeSchema = z.object({
  resetCode: z.string().nonempty("Enter the verification code"),
});

export type resetCodeDataType = z.infer<typeof resetCodeSchema>;
