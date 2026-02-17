import { getAllCategories } from "@/app/_services/categories.service";
import React from "react";
import Slider from "../Slider/Slider";

export default async function CategoriesSlider() {
  let categories = await getAllCategories();

  if (categories == null) return <h1>Error</h1>;

  let categoriesImages = categories?.map((category) => category.image);
  return (
    <>
      <Slider
        imagesList={categoriesImages}
        slidesPerView={5}
        spaceBetween={20}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      />
    </>
  );
}
