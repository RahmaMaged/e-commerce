"use client";
import { getUserWishlist } from "@/app/_actions/getUserWishlist.action";
import React, { createContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlist: any[] | null;
  loading: boolean;
  getData: () => Promise<void>;
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlist: null,
  loading: false,
  getData: async () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, setWishlist] = useState(null);
  //   const [numOfCartItems, setNumOfCartItems] = useState(0);
  //   const [cardId, setCardId] = useState(null);
  //   const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let userWishlist = await getUserWishlist();

    console.log("Wishlist", userWishlist);

    setWishlist(userWishlist);
    // setNumOfCartItems(cart.numOfCartItems);
    // setProducts(cart.data.products);
    // setTotalCartPrice(cart.data.totalCartPrice);
    setLoading(false);
  }

  useEffect(function () {
    getData();
  }, []);
  return (
    <>
      <wishlistContext.Provider
        value={{
          wishlist,
          getData,
          loading,
        }}
      >
        {children}
      </wishlistContext.Provider>
    </>
  );
}
