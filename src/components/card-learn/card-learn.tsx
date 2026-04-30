import { useState } from "react";
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
};

function CardLearn({ item }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="card-container">
      <motion.div
        className="card-learn"
        onClick={handleFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
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
                <span className="label">Reading</span>
                <span className="value jp">{item.reading}</span>
              </div>

              <div className="row">
                <span className="label">Romaji</span>
                <span className="value">{item.romaji}</span>
              </div>
            </div>

            {item.note && <div className="note">{item.note}</div>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CardLearn;
