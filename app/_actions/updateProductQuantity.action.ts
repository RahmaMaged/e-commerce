"use server";

import axios from "axios";
import { headers } from "next/headers";
import { getUserToken } from "./addToCart.action";

export async function UpdateCartItem(id: string, count: number) {
  const token = await getUserToken();
  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      count,
    },
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
