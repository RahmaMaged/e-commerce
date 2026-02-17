"use server";

import axios from "axios";

export async function resetCode(resetCode: string) {
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    { resetCode },
  );
  return data;
}
