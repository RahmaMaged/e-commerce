import axios from "axios";
import { getUserToken } from "./addToCart.action";

export async function removeItemFromWishlist(itemId: string) {
  let token = await getUserToken();

  let { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`,
    {
      headers: {
        token: token as string,
      },
    },
  );

  return data;
}
