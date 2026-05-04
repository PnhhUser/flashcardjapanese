import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import { type Japanese } from "../../core/model/japanese";
import Card from "../vocabulary-card";
import { useState } from "react"; // Thêm useState
import type { Swiper as SwiperType } from "swiper"; // Thêm type để định nghĩa

type Props = {
  data: Japanese[];
};

// Key dùng để lưu trong localStorage
const STORAGE_KEY = "current_vocab_index";

function Slide({ data }: Props) {
  // 1. Đọc index từ localStorage ngay khi khởi tạo (mặc định là 0)
  const [initialIndex] = useState(() => {
    const savedIndex = localStorage.getItem(STORAGE_KEY);
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  // 2. Hàm lưu index mỗi khi người dùng lướt slide
  const handleSlideChange = (swiper: SwiperType) => {
    localStorage.setItem(STORAGE_KEY, swiper.activeIndex.toString());
  };

  return (
    <div className="slide-app flex items-center justify-center h-screen">
      <Swiper
        direction={"vertical"}
        mousewheel={true}
        modules={[Mousewheel]}
        className="h-125 w-full "
        // 3. Gán vị trí bắt đầu
        initialSlide={initialIndex}
        // 4. Lắng nghe sự kiện đổi slide
        onSlideChange={handleSlideChange}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
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
