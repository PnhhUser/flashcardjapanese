import { Link } from "react-router";
import "./katakana.css";

function Katakana() {
  return (
    <div className="katakana-page">
      <h1 className="title">Katakana</h1>

      <div className="menu-list">
        <Link to="syllable" className="menu-card">
          <div className="card-left">
            <span className="card-icon">ア</span>
          </div>

          <div className="card-content">
            <h2>Âm tiết</h2>
            <p>~104 âm tiết Katakana</p>
          </div>

          <div className="card-arrow">→</div>
        </Link>

        <Link to="vocabulary" className="menu-card">
          <div className="card-left">
            <span className="card-icon">外</span>
          </div>

          <div className="card-content">
            <h2>Từ vựng</h2>
            <p>Từ vay mượn, tên riêng</p>
          </div>

          <div className="card-arrow">→</div>
        </Link>
      </div>
    </div>
  );
}

export default Katakana;
