import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let { productId } = await req.json();
  let { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    { productId },
    {
      headers: {
        token: "hhh",
      },
    },
  );

  return NextResponse.json(data);
}
