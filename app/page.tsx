import Image from "next/image";

import { getAllProducts } from "./_services/products.service";
import ProductCard from "./_components/ProductCard/productCard";
import image1 from "@/images/slider-image-1.jpeg";
import image2 from "@/images/slider-image-2.jpeg";
import image3 from "@/images/slider-image-3.jpeg";
import image4 from "@/images/slider-2.jpeg";
import Slider from "./_components/Slider/Slider";
// import CategoriesSlider from "./_components/categoriesSlider/CategoriesSlider";
import { lazy, Suspense } from "react";
import { ThreeDots } from "react-loader-spinner";

// Lazy Loading
let CategoriesSlider = lazy(
  () => import("./_components/categoriesSlider/CategoriesSlider"),
);

export default async function Home() {
  const allProducts = await getAllProducts();

  let imagesList = [image1.src, image2.src, image3.src, image4.src];
  return (
    <>
      <Slider imagesList={imagesList} />

      <h1 className="text-3xl text-center font-bold text-emerald-600 my-5">
        Categories
      </h1>
      <Suspense
        fallback={
          <h1 className="bg-emerald-100 text-3xl flex justify-center">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </h1>
        }
      >
        <CategoriesSlider />
      </Suspense>
      <h1 className="text-3xl text-center font-bold text-emerald-600 my-5">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
        {allProducts?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
