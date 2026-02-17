"use server";

import axios from "axios";
import { getUserToken } from "../_actions/addToCart.action";

export type shippingAddress = {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
};

export async function cashOrder(cartId: string, userData: shippingAddress) {
  const token = await getUserToken();
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    userData,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}

export async function visaOrder(cartId: string, userData: shippingAddress) {
  const token = await getUserToken();
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    userData,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
