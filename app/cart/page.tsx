"use client";
import { cartContext } from "@/providers/cartContextProvider";
import React, { useContext } from "react";
import { ProductType } from "../_types/product.type";
import { UpdateCartItem } from "../_actions/updateProductQuantity.action";
import { Minus, OctagonX, Plus, ShoppingCart, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { clearCart } from "../_actions/clearCart.action";
import { deleteItem } from "../_actions/deleteItem.action";

export default function CartPage() {
  let data = useContext(cartContext);

  console.log("Products From Cart", data.products);

  const route = useRouter();
  async function updateItemCount(id, count) {
    // const newData = await UpdateCartItem(id, count);
    toast.promise(UpdateCartItem(id, count), {
      loading: "Loading...",
      success: (newData) => {
        data.setProducts(newData.data.products);
        data.setNumOfCartItems(newData.numOfCartItems);
        data.setTotalCartPrice(newData.data.totalCartPrice);
        return "Updated";
      },
      error: "Error",
      position: "top-center",
    });

    // data.setProducts(newData.data.products);
  }

  async function removeItem(id) {
    toast.promise(deleteItem(id), {
      loading: "Loading...",
      success: (newData) => {
        data.setProducts(newData.data.products);
        data.setNumOfCartItems(newData.numOfCartItems);
        data.setTotalCartPrice(newData.data.totalCartPrice);
        return "Item removed";
      },
      error: "Error",
      position: "top-center",
    });
  }

  async function handleClearCart() {
    toast.promise(clearCart(), {
      loading: "Loading...",
      success: () => {
        data.setProducts([]);
        data.setNumOfCartItems(0);
        data.setTotalCartPrice(0);
        return "Cleared successfully";
      },
      error: "Error",
      position: "top-center",
    });

    // data.setProducts(newData.data.products);
  }

  if (data.loading) {
    return (
      <>
        <div className="h-screen bg-emerald-100 flex justify-center items-center">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-h-screen bg-gray-50 py-8 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
              Shopping Cart
            </h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start lg:gap-y-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
                  {data.products && data.products.length > 0 ? (
                    <ul role="list" className="divide-y divide-gray-200">
                      {data.products.map((item) => (
                        <li
                          key={item.product.id}
                          className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-gray-50 transition"
                        >
                          {/* Product Image */}
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.product.title}
                            </h3>

                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.product.brand.name}
                            </h3>

                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.product.category.name}
                            </h3>

                            <p className="mt-2 text-lg text-black">
                              Price:{" "}
                              <span className="font-medium text-gray-900">
                                {item.price}$
                              </span>
                            </p>

                            <p className="mt-1 text-lg text-black">
                              Quantity:{" "}
                              <button
                                className="border border-emerald-400 rounded-full p-1 mx-2 cursor-pointer text-black"
                                onClick={() =>
                                  updateItemCount(
                                    item.product.id,
                                    item.count - 1,
                                  )
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-medium text-gray-900">
                                {item.count}
                              </span>
                              <button
                                className="border border-emerald-400 rounded-full p-1 mx-2 cursor-pointer text-black"
                                onClick={() =>
                                  updateItemCount(
                                    item.product.id,
                                    item.count + 1,
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </p>

                            <button
                              className="mt-6 bg-emerald-400 p-2 rounded-md hover:bg-emerald-600 transition font-medium flex justify-center items-center text-black"
                              onClick={() => {
                                removeItem(item.product.id);
                              }}
                            >
                              <Trash className="mx-2" />
                              Remove Item
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-500">
                              {item.price * item.count}$
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-10 text-center text-emerald-600 text-lg flex justify-center items-center">
                      Your cart is empty <ShoppingCart className="ms-1" />
                    </div>
                  )}
                </div>

                <button
                  className="mt-6 bg-emerald-400 text-black p-3 rounded-md hover:bg-emerald-600 transition font-medium flex justify-center items-center"
                  onClick={() => {
                    handleClearCart();
                  }}
                >
                  <OctagonX className="mx-2" />
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-emerald-600 border-b border-gray-200 pb-4 mb-4 text-center">
                    Order Summary
                  </h2>

                  <dl className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <dt className="text-base font-bold text-black">
                        Total Items
                      </dt>
                      <dd className="text-base font-medium text-black">
                        {data.numOfCartItems}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <dt className="text-base font-bold text-black ">
                        Total Price
                      </dt>
                      <dd className="text-base font-bold text-black">
                        {data.totalCartPrice}$
                      </dd>
                    </div>
                  </dl>

                  <button
                    className="mt-6 w-full bg-emerald-400 text-black py-3 rounded-md hover:bg-emerald-600 transition font-medium"
                    onClick={() => {
                      route.push("/payment");
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
