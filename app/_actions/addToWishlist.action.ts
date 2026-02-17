"use server";

import axios from "axios";
import { getUserToken } from "./addToCart.action";

export async function addItemToWishlist(productId: string) {
  let token = await getUserToken();

  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    { productId },
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
