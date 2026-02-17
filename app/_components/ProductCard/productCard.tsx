import { ProductType } from "@/app/_types/product.type";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from "./addToCartBtn";
import AddToWishlistBtn from "./addToWishlistBtn";

type productCardPropsType = {
  item: ProductType;
};

export default function ProductCard({ item }: productCardPropsType) {
  return (
    <>
      <div className="bg-emerald-100 p-2 relative rounded-2xl">
        <Link href={`/product/${item.id}`}>
          <div className=" text-black ">
            {/* <img src={item.imageCover} alt="" /> */}
            <div className="relative h-48">
              <Image
                src={item.imageCover}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            <h2 className="font-bold text-2xl text-center">
              {item.title.split(" ", 2).join(" ")}
            </h2>

            {item.priceAfterDiscount ? (
              <>
                <div className="flex gap-2">
                  <span className="font-bold text-lg">Price:</span>
                  <h2 className="line-through text-red-500 text-lg">
                    {item.price}$
                  </h2>
                  <h2 className="text-xl">{item.priceAfterDiscount}$</h2>
                </div>
                <span className="absolute top-0 right-0 p-2 rounded-2xl bg-red-500 text-white">
                  {(
                    ((item.price - item.priceAfterDiscount) / item.price) *
                    100
                  ).toFixed(0)}
                  % Discount
                </span>
              </>
            ) : (
              <>
                <h2 className="text-lg">
                  <span className="font-bold ">Price: </span>
                  {item.price}$
                </h2>
              </>
            )}

            <p className="text-lg">
              <span className="font-bold">Brand</span> : {item.brand.name}
            </p>
            <p className="text-lg">
              <span className="font-bold">Category</span> : {item.category.name}
            </p>
          </div>
        </Link>

        <AddToCartBtn productId={item.id} />

        <AddToWishlistBtn productId={item.id} />
      </div>
    </>
  );
}
