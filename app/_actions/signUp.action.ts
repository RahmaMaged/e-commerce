"use server";

import { signUpDataType } from "@/schema/signUpschema";
import axios from "axios";
import { cookies } from "next/headers";

export async function signUpAction(userData: signUpDataType) {
  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    userData,
  );

  console.log(data);

  if (data.message == "success") {
    const cookiess = await cookies();
    cookiess.set("user-token", data.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
    });
    return true;
  } else {
    return false;
  }
}
