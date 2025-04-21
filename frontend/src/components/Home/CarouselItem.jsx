import React from "react";

export const CarouselItem = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center justify-center relative">
      <img className="w-[300px] h-[300px] rounded-full" src={image} alt="" />
      <span className="text-2xl font-bold text-[#e91e63]">{title}</span>
    </div>
  );
};
