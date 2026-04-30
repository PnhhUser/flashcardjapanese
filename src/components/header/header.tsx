import { useNavigate } from "react-router";
import type { ReactNode } from "react";

import "./header.css";

interface HeaderProps {
  title: string;
  right?: ReactNode;
}

function Header({ title, right }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* LEFT */}
      <button className="header-left" onClick={() => navigate(-1)}>
        ←
      </button>

      {/* CENTER */}
      <h1 className="header-title">{title}</h1>

      {/* RIGHT */}
      <div className="header-right">{right}</div>
    </header>
  );
}

export default Header;
