import { CiTextAlignRight } from "react-icons/ci";
import Drawer from "./components/drawer";
import { Outlet } from "react-router";
import { useDrawer } from "./core/contexts/DrawerContext";
import { useEffect } from "react";
import { track } from "./core/services/track";

function App() {
  const { isCollapse, toggleDrawer } = useDrawer();

  useEffect(() => {
    track();
  }, []);

  return (
    <div className="app min-h-screen bg-slate-50">
      {/* Nút mở Menu cố định (Floating Button) */}
      <button
        className={`fixed top-6 right-6 z-90 w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-2xl flex justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-blue-100 active:scale-90 ${
          !isCollapse ? "opacity-0 scale-0" : "opacity-100 scale-100"
        }`}
        onClick={toggleDrawer}
      >
        <CiTextAlignRight size={24} className="text-blue-600" />
      </button>

      {/* Main Content */}
      <main className="relative z-10 transition-all duration-500">
        <Outlet />
      </main>

      {/* Drawer bao gồm cả Overlay bên trong nó */}
      <Drawer />
    </div>
  );
}
export default App;
