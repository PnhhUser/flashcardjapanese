import { NavLink, Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";

import "./App.css";

function App() {
  const location = useLocation();

  const isKatakana = location.pathname.includes("katakana");

  return (
    <div className="app">
      <nav className="navbar">
        <NavLink to="/hiragana" className="link-item">
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="slider"
                  className={`slider ${
                    isKatakana ? "bg-green-500" : "bg-blue-500"
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={isActive ? "active-link" : ""}>Hiragana</span>
            </>
          )}
        </NavLink>

        {/* <NavLink to="/katakana" className="link-item">
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="slider"
                  className={`slider ${
                    isKatakana ? "bg-green-500" : "bg-blue-500"
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={isActive ? "active-link" : ""}>Katakana</span>
            </>
          )}
        </NavLink> */}
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
