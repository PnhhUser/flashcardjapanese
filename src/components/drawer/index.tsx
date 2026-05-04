import { CiTextAlignLeft } from "react-icons/ci";
import Nav from "../nav";
import { useDrawer } from "../../core/contexts/DrawerContext";

function Drawer() {
  const { isCollapse, toggleDrawer } = useDrawer();
  return (
    <div
      className={`h-screen bg-white border-l border-slate-200 fixed top-0 right-0 transition-all duration-300 ease-in-out z-99 overflow-hidden ${
        isCollapse ? "w-0 border-none" : "w-80"
      }`}
    >
      <div className="w-80 h-full flex flex-col">
        {/* Header */}
        <div className="w-full flex-none h-12 flex items-center justify-end border-b border-slate-200 px-2">
          <button
            className="w-9 h-9 bg-blue-400 hover:bg-blue-500 transition-colors flex justify-center items-center cursor-pointer"
            onClick={toggleDrawer}
          >
            <CiTextAlignLeft size={18} className="text-white" />
          </button>
        </div>

        <div className="w-full flex-1 overflow-y-auto p-4 bg-slate-50/50">
          <div className="space-y-4">
            <Nav />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
