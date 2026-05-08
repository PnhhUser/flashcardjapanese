import { useEffect, useState } from "react";
import { CiVolumeHigh, CiUndo } from "react-icons/ci";
import { JapaneseType, type Japanese } from "../../core/model/japanese";
import { useSwiper } from "swiper/react";

type Props = {
  data: Japanese;
  isActive?: boolean;
};

function Card({ data, isActive }: Props) {
  const [flip, setFlip] = useState<boolean>(false);
  const [prevIsActive, setPrevIsActive] = useState(isActive);
  const swiper = useSwiper();

  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setFlip((prev) => !prev);
      }
      if (e.key === "ArrowDown") swiper.slideNext();
      if (e.key === "ArrowUp") swiper.slidePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isActive, swiper]);

  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (!isActive) setFlip(false);
  }

  const handleFlip = () => setFlip((prev) => !prev);
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    swiper.slideNext();
  };

  const onSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const getFontSize = (type: JapaneseType) => {
    return type === JapaneseType.Character ? "text-6xl" : "text-4xl";
  };

  return (
    <div className="w-full max-w-sm h-64 perspective mx-auto group">
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
          flip ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}
      >
        {/* MẶT TRƯỚC (FRONT) */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col p-6 overflow-hidden">
          {/* Header Card */}
          <div className="flex justify-between items-center w-full mb-2">
            <button
              onClick={(e) => onSpeak(e, data.term)}
              className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 rounded-2xl transition-all duration-300 active:scale-90 shadow-sm"
            >
              <CiVolumeHigh size={24} />
            </button>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              {data.type === JapaneseType.Character
                ? "Character"
                : "Vocabulary"}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-center">
            <h2
              className={`${getFontSize(data.type)} font-bold text-slate-800 tracking-tighter`}
            >
              {data.term}
            </h2>
          </div>

          {/* Footer Card */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
            >
              Bỏ qua
            </button>
            <button className="flex-1 py-3 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-200 transition-all">
              Chi tiết
            </button>
          </div>
        </div>

        {/* MẶT SAU (BACK) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 rounded-4xl shadow-2xl p-8 flex flex-col text-white">
          <div className="flex justify-between items-center mb-6">
            <CiUndo size={20} className="text-slate-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Meaning
            </span>
          </div>

          <div className="space-y-5 flex-1 flex flex-col justify-center">
            {/* Row: Meaning */}
            <div>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-tighter mb-1">
                Ý nghĩa
              </p>
              <p className="text-xl font-medium leading-tight">
                {data.type === JapaneseType.Character
                  ? data.note
                  : data.meaning}
              </p>
            </div>

            {/* Row: Reading */}
            <div className="flex gap-8">
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter mb-1">
                  Cách đọc
                </p>
                <p className="text-lg font-bold text-white">{data.reading}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter mb-1">
                  Romaji
                </p>
                <p className="text-lg font-medium text-slate-300 italic">
                  {data.romaji}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[9px] text-slate-600 uppercase font-bold">
              Chạm để quay lại
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
