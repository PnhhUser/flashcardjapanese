import { motion } from "framer-motion";
import "./card-learn.css";
import type { JapaneseType, Typeface } from "../../core/enums";

export interface JapaneseItem {
  id: string;
  term: string;
  reading: string;
  romaji: string;
  meaning: string;
  typeface: Typeface;
  type: JapaneseType;
  note: string;
}

type Props = {
  item: JapaneseItem;
  isFlipped: boolean;
  onFlip: () => void;
};

function CardLearn({ item, isFlipped, onFlip }: Props) {
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(item.term);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Trình duyệt không hỗ trợ Web Speech API");
    }
  };

  return (
    <div className="card-container">
      <motion.div
        className="card-learn"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="card-face front">
          <span className="term">{item.term}</span>
        </div>

        {/* Back */}
        <div className="card-face back">
          <div className="back-content">
            <div className="main">
              <div className="row">
                <span className="label">Cách đọc</span>
                <span className="value jp">{item.reading}</span>
              </div>

              <div className="row">
                <span className="label">Romaji</span>
                <span className="value">{item.romaji}</span>
              </div>
            </div>

            {item.note && <div className="note">{item.note}</div>}
          </div>

          <button
            className="speaker-btn"
            onClick={handleSpeak}
            aria-label="Phát âm"
          >
            🔊
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CardLearn;
