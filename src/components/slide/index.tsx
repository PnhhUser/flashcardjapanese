import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules"; // Thêm Pagination để đẹp hơn
import "swiper/css";
import "swiper/css/pagination";
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
    <div className="w-full h-screen bg-translate flex items-center justify-center overflow-hidden">
      {/* Container bọc Swiper: 
        - Giới hạn chiều rộng tối đa để Card không bị quá to 
        - Thêm padding để tránh nút Menu cố định ở góc 
      */}
      <div className="w-full max-w-lg h-125 md:h-150 px-4">
        <Swiper
          direction={"vertical"}
          mousewheel={true}
          modules={[Mousewheel]}
          className="h-full w-full rounded-4xl" // Bo góc cho vùng chứa slide
          initialSlide={initialIndex}
          onSlideChange={handleSlideChange}
          spaceBetween={30} // Khoảng cách giữa các slide
        >
          {data.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center h-full!"
            >
              {({ isActive }) => (
                <div
                  className={`w-full transition-all duration-500 transform ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-40 blur-sm"
                  }`}
                >
                  <Card data={item} isActive={isActive} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hướng dẫn nhỏ phía dưới */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] animate-pulse">
            Cuộn chuột hoặc Vuốt để chuyển từ
          </p>
        </div>
      </div>
    </div>
  );
}

export default Slide;
