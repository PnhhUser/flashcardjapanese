import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./slide.css";
import CardLearn, { type JapaneseItem } from "../card-learn/card-learn";

function Slide() {
  const [data, setData] = useState<JapaneseItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5127/api/v1/japanese/hiragana")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Swiper
      className="slide"
      spaceBetween={20}
      slidesPerView={1}
      loop={data.length > 1}
    >
      {data.map((item) => (
        <SwiperSlide className="slide-item" key={item.id}>
          <CardLearn item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slide;
