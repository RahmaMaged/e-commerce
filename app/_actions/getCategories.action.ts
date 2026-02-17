"use server";

import axios from "axios";

export async function getCategories() {
  try {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories",
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
