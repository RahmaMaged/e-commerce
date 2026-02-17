"use client";
import { wishlistContext } from "@/providers/wishlistContextProvider";
import { BookmarkX, ShoppingCart, Trash } from "lucide-react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";
import { removeItemFromWishlist } from "../_actions/removeItemFromWishList.action";

export default function WishlistPage() {
  let data = useContext(wishlistContext);
  console.log("Data From Wishlist", data);

  //   const route = useRouter();

  async function removeItem(id) {
    toast.promise(removeItemFromWishlist(id), {
      loading: "Loading...",
      success: async () => {
        await data.getData();
        return "Item removed";
      },
      error: "Error",
      position: "top-center",
    });
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
              Wish List
            </h1>

            <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
              {data.wishlist && data.wishlist.data.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-200">
                  {data.wishlist.data.map((item) => (
                    <li
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-gray-50 transition my-2"
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 shrink-0">
                        <img
                          src={item.imageCover}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-black">
                          {item.title}
                        </h3>

                        <h3 className="text-lg text-black">
                          <span className="font-bold">Brand : </span>
                          {item.brand.name}
                        </h3>

                        <h3 className="text-lg text-black">
                          <span className="font-bold">Category : </span>
                          {item.category.name}
                        </h3>

                        <p className="mt-2 text-lg text-black">
                          <span className="font-medium text-black">
                            <span className="font-bold">Price : </span>
                            {item.price}$
                          </span>
                        </p>

                        <button
                          className="mt-6 bg-emerald-400 text-black p-2 rounded-md hover:bg-emerald-600 transition font-medium flex justify-center items-center"
                          onClick={() => {
                            removeItem(item.id);
                          }}
                        >
                          <BookmarkX className="mx-2" />
                          Remove Item
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-10 text-center text-emerald-600 text-lg flex justify-center items-center">
                  Your wish list is empty <ShoppingCart className="ms-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
