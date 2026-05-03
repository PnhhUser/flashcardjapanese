// vocabulary.tsx
import { useLocation } from "react-router";
import Header from "../../components/header/header";
import Slide from "../../components/slide/slide";

import "./vocabulary.css";

function Vocabulary() {
  const location = useLocation();
  const pathType = location.pathname.split("/")[1];

  const type = pathType === "hiragana" ? "hiragana" : "katakana";
  const title = pathType === "hiragana" ? "Hiragana" : "Katakana";

  return (
    <div className="vocabulary">
      <Header title={"Từ vựng " + title} />
      <div className="content">
        <div className="wrapper">
          <Slide type={type} category="vocabulary" />
        </div>
      </div>
    </div>
  );
}

export default Vocabulary;
