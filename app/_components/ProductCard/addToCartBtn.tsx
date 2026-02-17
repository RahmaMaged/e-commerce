"use client";
import { addItemToCart } from "@/app/_actions/addToCart.action";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/providers/cartContextProvider";
import { Loader, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

type CartBtnProps = {
  productId: string;
};

export default function AddToCartBtn({ productId }: CartBtnProps) {
  let cartData = useContext(cartContext);

  const [loading, setLoading] = useState(false);
  async function addToCart() {
    console.log("click", productId);

    setLoading(true);

    // let { data } = await axios.post(
    //   "http://localhost:3000/api/hamada",
    //   { productId },
    //   {
    //     headers: {
    //       token: "hhh",
    //     },
    //   },
    // );

    let data = await addItemToCart(productId);

    if (data.status === "success") {
      toast.success("Added to cart successfully", { position: "top-center" });
      await cartData.getData();
    }

    setLoading(false);
  }
  return (
    <>
      <Button
        onClick={addToCart}
        className="w-full my-3 cursor-pointer bg-emerald-300 text-black hover:bg-emerald-500"
      >
        {loading ? <Loader className="animate-spin" /> : <ShoppingCart />} Add
        To Cart
      </Button>
    </>
  );
}
