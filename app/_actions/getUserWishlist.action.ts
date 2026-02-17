"use server";

import axios from "axios";
import { getUserToken } from "./addToCart.action";

export async function getUserWishlist() {
  let token = await getUserToken();

  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
