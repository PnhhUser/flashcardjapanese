// vocabulary-card.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import "./vocabulary-card.css";

export interface VocabularyItem {
  id: string;
  term: string;
  reading: string;
  romaji: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  note?: string;
}

type Props = {
  item: VocabularyItem;
  isFlipped?: boolean;
  onFlip?: () => void;
};

function VocabularyCard({ item, isFlipped = false, onFlip }: Props) {
  const [internalFlipped, setInternalFlipped] = useState(false);

  const flipped = onFlip ? isFlipped : internalFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalFlipped((prev) => !prev);
    }
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="vocab-card-container">
      <motion.div
        className="vocab-card"
        onClick={handleFlip}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Mặt trước */}
        <div className="vocab-card-front">
          <button
            className="speaker-btn-front"
            onClick={(e) => handleSpeak(e, item.term)}
            aria-label="Phát âm"
          >
            🔊
          </button>
          <div className="term-wrapper">
            <span className="term-text">{item.term}</span>
          </div>
        </div>

        {/* Mặt sau */}
        <div className="vocab-card-back custom-scrollbar">
          <div className="back-content">
            {/* Cách đọc */}
            <div className="reading-section">
              <div className="reading-row">
                <span className="label">
                  📖 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="reading-text">{item.reading}</span>
              </div>
              <div className="reading-row">
                <span className="label">🔤 </span>
                <span className="romaji-text">{item.romaji}</span>
              </div>
            </div>

            {/* Nghĩa */}
            <div className="meaning-section">
              <span className="label">✨ Nghĩa</span>
              <p className="meaning-text">{item.meaning}</p>
            </div>

            {/* Ví dụ */}
            {item.example && (
              <div className="example-section">
                <span className="label">📝 Ví dụ</span>
                <p className="example-text">{item.example}</p>
                {item.exampleMeaning && (
                  <p className="example-meaning">{item.exampleMeaning}</p>
                )}
              </div>
            )}

            {/* Ghi chú */}
            {item.note && (
              <div className="note-section">
                <span className="label">💡 Ghi chú</span>
                <p className="note-text">{item.note}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default VocabularyCard;
