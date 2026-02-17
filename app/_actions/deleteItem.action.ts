"use server";
import axios from "axios";
import { getUserToken } from "./addToCart.action";

export async function deleteItem(itemId: string) {
  let token = await getUserToken();

  let { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
