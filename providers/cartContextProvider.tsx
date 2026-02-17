"use client";
import { getUserCart } from "@/app/_actions/getUserCart.action";
import React, { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cardId, setCardId] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    let cart = await getUserCart();

    console.log("Cart", cart);

    setCardId(cart.cartId);
    setNumOfCartItems(cart.numOfCartItems);
    setProducts(cart.data.products);
    setTotalCartPrice(cart.data.totalCartPrice);
    setLoading(false);
  }

  useEffect(function () {
    getData();
  }, []);
  return (
    <>
      <cartContext.Provider
        value={{
          cardId,
          numOfCartItems,
          products,
          setNumOfCartItems,
          totalCartPrice,
          setTotalCartPrice,
          setProducts,
          loading,
          getData,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
