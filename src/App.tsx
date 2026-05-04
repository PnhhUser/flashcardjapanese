import { CiTextAlignRight } from "react-icons/ci";
import Drawer from "./components/drawer";
import { Outlet } from "react-router";
import { useDrawer } from "./core/contexts/DrawerContext";

function App() {
  const { isCollapse, toggleDrawer } = useDrawer();

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
      <Outlet />

      <Drawer />
    </div>
  );
}

export default App;
