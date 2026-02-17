"use server";

import axios from "axios";

export async function forgetPassword(email: string) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    { email },
  );
  return data;
}
