"use client";
import { addItemToWishlist } from "@/app/_actions/addToWishlist.action";
import { Button } from "@/components/ui/button";
import { wishlistContext } from "@/providers/wishlistContextProvider";
import { Bookmark, Loader } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

type WishlistBtnProps = {
  productId: string;
};

export default function AddToWishlistBtn({ productId }: WishlistBtnProps) {
  let wishlistData: any = useContext(wishlistContext);

  const [loading, setLoading] = useState(false);
  async function addTowishList() {
    console.log("click from wishlist", productId);

    setLoading(true);

    let data = await addItemToWishlist(productId);

    console.log("Data after adding to wishlist", data);

    if (data.status === "success") {
      toast.success("Added to wishlist successfully", {
        position: "top-center",
      });
      wishlistData.getData();
    }

    setLoading(false);
  }
  return (
    <>
      <Button
        onClick={addTowishList}
        className="w-full my-3 cursor-pointer bg-emerald-300 text-black hover:bg-emerald-500"
      >
        {loading ? <Loader className="animate-spin" /> : <Bookmark />} Add To
        Wish List
      </Button>
    </>
  );
}
