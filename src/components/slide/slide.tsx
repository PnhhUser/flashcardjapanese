// slide.tsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./slide.css";
import CardLearn, { type JapaneseItem } from "../card-learn/card-learn";
import VocabularyCard, {
  type VocabularyItem,
} from "../vocabulary-card/vocabulary-card";
const BASE_URL = import.meta.env.VITE_API_URL;

type Props = {
  type?: "hiragana" | "katakana";
  category?: "syllable" | "vocabulary";
};

function Slide({ type = "hiragana", category = "syllable" }: Props) {
  const [data, setData] = useState<JapaneseItem[] | VocabularyItem[]>([]);
  const [flippedStates, setFlippedStates] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Kiểm tra nếu là Katakana vocabulary thì báo lỗi
      if (type === "katakana" && category === "vocabulary") {
        setError("Từ vựng Katakana đang được cập nhật. Vui lòng quay lại sau!");
        setLoading(false);
        return;
      }

      // Khai báo và gán giá trị trực tiếp
      const endpoint =
        category === "syllable"
          ? type === "hiragana"
            ? `${BASE_URL}/japanese/hiragana`
            : ""
          : `${BASE_URL}/japanese/vocabulary`;

      try {
        const response = await fetch(endpoint);
        const res = await response.json();

        if (res.success) {
          setData(res.data);
          setFlippedStates(new Array(res.data.length).fill(false));
        } else {
          setError("Không thể tải dữ liệu");
        }
      } catch (err) {
        console.error(err);
        setError("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, category]);

  const handleFlip = (index: number) => {
    setFlippedStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleSlideChangeTransitionEnd = () => {
    setFlippedStates(new Array(data.length).fill(false));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="empty-container">
        <p>Chưa có dữ liệu</p>
        <p>Vui lòng quay lại sau!</p>
      </div>
    );
  }

  return (
    <Swiper
      className="slide"
      spaceBetween={20}
      slidesPerView={1}
      onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
    >
      {data.map((item, index) => (
        <SwiperSlide className="slide-item" key={item.id}>
          {category === "vocabulary" ? (
            <VocabularyCard
              item={item as VocabularyItem}
              isFlipped={flippedStates[index]}
              onFlip={() => handleFlip(index)}
            />
          ) : (
            <CardLearn
              item={item as JapaneseItem}
              isFlipped={flippedStates[index]}
              onFlip={() => handleFlip(index)}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slide;
