import { useEffect, useState } from "react";
import { CiVolumeHigh } from "react-icons/ci";
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
      if (e.key === "ArrowRight") {
        setFlip((prev) => !prev);
      }

      if (e.key === "ArrowDown") {
        swiper.slideNext();
      }

      if (e.key === "ArrowUp") {
        swiper.slidePrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isActive, swiper]);

  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (!isActive) {
      setFlip(false);
    }
  }

  const handleSkip = () => {
    swiper.slideNext();
  };

  const handleFlip = () => {
    setFlip((prev) => !prev);
  };

  const onSpeak = (text: string) => {
    if (!window.speechSynthesis) {
      console.error("Trình duyệt của bạn không hỗ trợ phát âm.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "ja-JP";

    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const UpperSize = (type: JapaneseType) => {
    return type === JapaneseType.Character ? "text-[3rem]" : "text-[1.1rem]";
  };

  return (
    <div className="w-full max-w-sm h-40 perspective">
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flip ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden p-2 bg-white rounded-xl border border-slate-200 flex flex-col">
          <div className="w-full flex-1 relative">
            <div
              className="absolute left-0 w-8 h-8 bg-white shadow rounded-full cursor-pointer active:scale-90 transition-all duration-150 flex justify-center items-center group hover:border-blue-400 border border-transparent"
              onClick={() => onSpeak(data.term)}
            >
              <CiVolumeHigh
                size={16}
                className="text-slate-400 group-hover:text-blue-400"
              />
            </div>
          </div>

          <div className="w-full flex-2">
            <p
              className={
                " mt-1 text-center font-bold cursor-default " +
                UpperSize(data.type)
              }
            >
              {data.term}
            </p>
          </div>

          <div className="w-full flex-1 flex justify-between">
            <button
              className="bg-slate-300 text-white w-16 text-[12px] rounded active:scale-90 transition-all"
              onClick={handleSkip}
            >
              Bỏ qua
            </button>

            <button
              className="bg-blue-300 text-white w-16 text-[12px] rounded active:scale-90 transition-all"
              onClick={handleFlip}
            >
              Chi tiết
            </button>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute w-full h-full backface-hidden rotate-y-180 p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-center cursor-default"
          onClick={handleFlip}
        >
          <table className="w-full border-collapse">
            <tbody>
              {data.type === JapaneseType.Character ? (
                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-500 border-r border-slate-200  w-1/4">
                    ghi chú
                  </td>
                  <td className="py-2 pl-4 text-slate-800 text-right">
                    {data.note}
                  </td>
                </tr>
              ) : (
                <tr className="border-b border-slate-200">
                  <td className="py-2 font-semibold text-slate-500 border-r border-slate-200  w-1/4">
                    Ý nghĩa
                  </td>
                  <td className="py-2 pl-4 text-slate-800 text-right">
                    {data.meaning}
                  </td>
                </tr>
              )}

              <tr className="border-b border-slate-200">
                <td className="py-2 font-semibold text-slate-500 border-r border-slate-200">
                  Cách đọc
                </td>
                <td className="py-2 pl-4 text-slate-800 text-right font-bold">
                  {data.reading}
                </td>
              </tr>

              <tr>
                <td className="py-2 font-semibold text-slate-500 border-r border-slate-200">
                  Romaji
                </td>
                <td className="py-2 pl-4 text-slate-800 text-right">
                  {data.romaji}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Card;
