"use client";
interface CartContextType {
  cardId: string | null;
  numOfCartItems: number;
  products: any[] | null;
  totalCartPrice: number;
  loading: boolean;
  setNumOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  setTotalCartPrice: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<any[] | null>>;
  getData: () => Promise<void>;
}

import { getUserCart } from "@/app/_actions/getUserCart.action";
import React, { createContext, useEffect, useState } from "react";

export let cartContext = createContext<CartContextType>({
  cardId: null,
  numOfCartItems: 0,
  products: null,
  totalCartPrice: 0,
  loading: false,
  setNumOfCartItems: () => {},
  setTotalCartPrice: () => {},
  setProducts: () => {},
  getData: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<any[] | null>(null);
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
