"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type SliderPropsType = {
  imagesList: string[];
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: any;
};

export default ({
  imagesList,
  breakpoints,
  slidesPerView = 1,
  spaceBetween = 0,
}: SliderPropsType) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      {...(breakpoints
        ? { breakpoints }
        : { slidesPerView: slidesPerView || 1 })}
      className="my-5"
      loop
      //   onSlideChange={() => console.log("slide change")}
      //   onSwiper={(swiper) => console.log(swiper)}
    >
      {imagesList.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            className={`w-full h-96 object-cover rounded-lg `}
            src={src}
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
