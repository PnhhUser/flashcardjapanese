import { Link } from "react-router";
import "./hiragana.css";

function Hiragana() {
  return (
    <div className="hiragana-page">
      <h1 className="title">Hiragana</h1>

      <div className="menu-list">
        <Link to="syllable" className="menu-card">
          <div className="card-left">
            <span className="card-icon">あ</span>
          </div>

          <div className="card-content">
            <h2>Âm tiết</h2>
            <p>~104 âm tiết cơ bản</p>
          </div>

          <div className="card-arrow">→</div>
        </Link>

        <Link to="vocabulary" className="menu-card">
          <div className="card-left">
            <span className="card-icon">言</span>
          </div>

          <div className="card-content">
            <h2>Từ vựng</h2>
            <p>Luyện từ vựng Hiragana</p>
          </div>

          <div className="card-arrow">→</div>
        </Link>
      </div>
    </div>
  );
}

export default Hiragana;
