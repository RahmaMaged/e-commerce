"use server";
import axios from "axios";
import { getUserToken } from "./addToCart.action";

export async function clearCart() {
  let token = await getUserToken();

  let { data } = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token: token as string,
      },
    },
  );

  console.log("Cleaaar");

  return data;
}
