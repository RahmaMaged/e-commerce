import AddToCartBtn from "@/app/_components/ProductCard/addToCartBtn";
import AddToWishlistBtn from "@/app/_components/ProductCard/addToWishlistBtn";
import Slider from "@/app/_components/Slider/Slider";
import { getProduct } from "@/app/_services/products.service";
import { notFound } from "next/navigation";
import { FaStar } from "react-icons/fa";

type ProductDetailsPropsType = {
  params: {
    id: string;
  };
};

export default async function page(props: ProductDetailsPropsType) {
  let data = await props.params;
  console.log(data.id);
  let productData = await getProduct(data.id);

  if (productData == null) notFound();

  return (
    <>
      <div className="grid grid-cols-4 gap-5 items-center">
        <div>
          <img
            className="w-full"
            src={productData?.imageCover}
            alt={productData?.title}
          />
        </div>

        <div className="col-span-3 mx-auto">
          <h1 className="text-2xl font-bold">{productData?.title}</h1>
          <p className="text-2xl">
            <span className="font-bold">Brand :</span> {productData?.brand.name}
          </p>
          <p className="text-2xl">
            <span className="font-bold">Category :</span>{" "}
            {productData?.category.name}
          </p>
          <p className="text-lg">
            <span className="font-bold text-2xl">Description :</span>
            {productData?.description}
          </p>
          <p className="flex  items-center gap-3 font-bold text-lg">
            <FaStar className="text-yellow-300" />{" "}
            <FaStar className="text-yellow-300" />{" "}
            <FaStar className="text-yellow-300" /> {productData?.ratingsAverage}
          </p>

          {/* <button className="bg-emerald-600 text-white text-2xl p-3 rounded-2xl w-full mt-5">
            Add To cart
          </button> */}

          <AddToCartBtn productId={productData?.id} />
          <AddToWishlistBtn productId={productData?.id} />
        </div>
      </div>
    </>
  );
}
