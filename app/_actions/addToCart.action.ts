"use server";

import axios from "axios";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addItemToCart(productId: string) {
  let token = await getUserToken();

  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}

export async function getUserToken() {
  let myCookies = await cookies();
  let tokenFromCookies =
    myCookies.get("next-auth.session-token") ??
    myCookies.get("__Secure-next-auth.session-token");
  console.log(tokenFromCookies?.value);
  let decodedUserToken = await decode({
    token: tokenFromCookies?.value!,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log("decodedUserToken", decodedUserToken?.userTokenFromBackend);

  return decodedUserToken?.userTokenFromBackend;
}
