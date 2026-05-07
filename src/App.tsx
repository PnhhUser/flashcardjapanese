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
    <div className="app">
      {isCollapse && (
        <div
          className="w-12 h-12 bg-blue-400 flex justify-center items-center absolute top-4 right-4 cursor-pointer"
          onClick={toggleDrawer}
        >
          <CiTextAlignRight size={22} className="text-white" />
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Drawer />
    </div>
  );
}

export default App;
