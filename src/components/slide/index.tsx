import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { type Japanese } from "../../core/model/japanese";
import Card from "../card";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

type Props = {
  data: Japanese[];
  storageKey: string;
};

function Slide({ data, storageKey }: Props) {
  const [initialIndex] = useState(() => {
    const savedIndex = localStorage.getItem(storageKey);
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const handleSlideChange = (swiper: SwiperType) => {
    localStorage.setItem(storageKey, swiper.activeIndex.toString());
  };

  return (
    <div className="slide-app flex items-center justify-center h-screen">
      <Swiper
        direction={"vertical"}
        mousewheel={true}
        modules={[Mousewheel]}
        className="h-125 w-full "
        initialSlide={initialIndex}
        onSlideChange={handleSlideChange}
      >
        {data.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center justify-center"
          >
            {({ isActive }) => (
              <div className="w-full max-w-sm">
                <Card data={item} isActive={isActive} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slide;
