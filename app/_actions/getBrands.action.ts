"use server";

import axios from "axios";

export async function getBrands() {
  try {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands",
      {
        params: {
          limit: 40,
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Error");
    throw error;
  }
}
