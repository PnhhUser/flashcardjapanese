import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Japanese } from "../../core/model/japanese";
import { getAllVocabulary } from "../../core/services/japanese";

// Thêm trạng thái 'idle' cho màn hình bắt đầu
type GameStatus = "idle" | "playing" | "won" | "lost";

function QuickRecognition() {
  const [originalVocab, setOriginalVocab] = useState<Japanese[]>([]);
  const [vocabList, setVocabList] = useState<Japanese[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [status, setStatus] = useState<GameStatus>("idle"); // Mặc định là idle
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array: Japanese[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    getAllVocabulary().then((res) => {
      const data = res.data || [];
      setOriginalVocab(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (status !== "playing" || loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus("lost");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, loading]);

  const handleCheck = useCallback(() => {
    if (status !== "playing" || !inputValue.trim()) return;

    const currentWord = vocabList[currentIndex];
    const isCorrect =
      inputValue.trim().toLowerCase() === currentWord.meaning.toLowerCase();

    if (isCorrect) {
      if (currentIndex + 1 < vocabList.length) {
        setCurrentIndex((prev) => prev + 1);
        setInputValue("");
        setTimeLeft(30);
      } else {
        setStatus("won");
      }
    } else {
      setStatus("lost");
    }
  }, [inputValue, currentIndex, vocabList, status]);

  // Bắt đầu game mới
  const startGame = () => {
    setVocabList(shuffleArray(originalVocab));
    setCurrentIndex(0);
    setInputValue("");
    setTimeLeft(30);
    setStatus("playing");
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold text-slate-400 uppercase tracking-[0.3em] animate-pulse italic">
        Đang chuẩn bị thử thách...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 overflow-hidden font-sans text-slate-800">
      <div className="bg-white w-full max-w-6xl max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border border-white/50">
        {/* Lớp mờ chặn tương tác khi không ở trạng thái playing */}
        <div
          className={`flex flex-col h-full overflow-hidden transition-all duration-700 ${status !== "playing" ? "blur-xl grayscale" : ""}`}
        >
          {/* VÙNG HIỂN THỊ CHỮ NHẬT */}
          <div className="bg-slate-50/80 px-8 py-4 md:py-6 flex flex-col items-center justify-center border-b border-slate-100">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 w-full max-w-3xl flex items-center justify-center aspect-21/5 max-h-[20vh] mb-3"
            >
              <span className="text-2xl md:text-4xl font-black text-slate-700 tracking-tighter">
                {vocabList[currentIndex]?.term || "---"}
              </span>
            </motion.div>
            <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-[9px]">
              Tiến trình: {currentIndex + 1} / {vocabList.length}
            </p>
          </div>

          {/* VÙNG NHẬP LIỆU */}
          <div className="p-6 md:p-8 md:px-20 flex flex-col space-y-6">
            <div className="w-full max-w-5xl mx-auto">
              <div className="flex justify-between items-end mb-2 px-2">
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Thời gian phản xạ
                </span>
                <span
                  className={`font-mono font-bold text-2xl ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-orange-500"}`}
                >
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / 30) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                  className={`h-full rounded-full ${timeLeft <= 5 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "bg-linear-to-r from-orange-400 to-orange-600"}`}
                />
              </div>
            </div>

            <div className="w-full max-w-5xl mx-auto">
              <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase ml-4 tracking-widest">
                Đáp án của bạn
              </label>
              <input
                autoFocus={status === "playing"}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="Nhập nghĩa tiếng Việt..."
                className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-4 text-xl outline-none transition-all shadow-inner"
              />
            </div>

            <div className="w-full flex justify-center pb-2">
              <button
                onClick={handleCheck}
                className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl text-base shadow-lg shadow-blue-200 transition-all active:scale-[0.97] uppercase tracking-[0.2em]"
              >
                Xác nhận (Enter)
              </button>
            </div>
          </div>
        </div>

        {/* OVERLAYS (IDLE / WIN / LOSS) */}
        <AnimatePresence>
          {status !== "playing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl"
              >
                {/* HIỂN THỊ NỘI DUNG TÙY THEO STATUS */}
                {status === "idle" ? (
                  <>
                    <div className="text-6xl mb-6 animate-bounce">⚡</div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                      Chinh phục từ vựng
                    </h2>
                    <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">
                      Luật chơi: Mỗi từ có 30 giây. Sai 1 từ - Game Over. <br />{" "}
                      Bạn đã sẵn sàng chưa?
                    </p>
                    <button
                      onClick={startGame}
                      className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest active:scale-95"
                    >
                      Bắt đầu ngay
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4">
                      {status === "won" ? "🎊" : "💀"}
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase italic">
                      {status === "won" ? "The Conqueror!" : "Gục ngã!"}
                    </h2>
                    <p className="text-slate-500 mb-8 text-sm font-medium">
                      {status === "won"
                        ? "Bạn đã vượt qua mọi từ vựng mà không sai một lỗi nào. Đỉnh cao!"
                        : `Bạn đã dừng bước tại từ thứ ${currentIndex + 1}.`}
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={startGame}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all uppercase tracking-widest text-sm"
                      >
                        {status === "won"
                          ? "Chơi lại vòng mới"
                          : "Phục thù (Random mới)"}
                      </button>
                      <button
                        onClick={() => setStatus("idle")} // Quay về màn hình chờ
                        className="w-full bg-slate-100 text-slate-400 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-sm"
                      >
                        Thoát ra sảnh
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default QuickRecognition;
