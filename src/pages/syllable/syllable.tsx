// syllable.tsx
import { useLocation } from "react-router";
import Header from "../../components/header/header";

import "./syllable.css";
import Slide from "../../components/slide/slide";

function Syllable() {
  const location = useLocation();
  const pathType = location.pathname.split("/")[1]; // 'hiragana' hoặc 'katakana'

  // Xác định type dựa trên đường dẫn
  const type = pathType === "hiragana" ? "hiragana" : "katakana";
  const title = pathType === "hiragana" ? "Hiragana" : "Katakana";

  return (
    <div className="syllable">
      <Header title={"Âm tiết " + title} />
      <div className="content">
        <div className="wrapper">
          <Slide type={type} />
        </div>
      </div>
    </div>
  );
}

export default Syllable;
