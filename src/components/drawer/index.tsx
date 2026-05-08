import { CiTextAlignLeft } from "react-icons/ci";
import Nav from "../nav";
import { useDrawer } from "../../core/contexts/DrawerContext";

function Drawer() {
  const { isCollapse, toggleDrawer } = useDrawer();

  return (
    <>
      {/* Overlay nằm ngay trong Drawer để quản lý Z-index dễ hơn */}
      {!isCollapse && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-100 transition-opacity duration-300"
          onClick={toggleDrawer}
        />
      )}

      <div
        className={`h-screen bg-white fixed top-0 right-0 transition-all duration-500 ease-in-out z-101 shadow-2xl flex flex-col ${
          isCollapse
            ? "translate-x-full w-0"
            : "translate-x-0 w-[320px] rounded-l-4xl"
        }`}
      >
        {/* Header Drawer */}
        <div className="w-full flex-none h-20 flex items-center justify-between px-6 border-b border-slate-50">
          <span className="font-black text-blue-600 tracking-tighter text-xl">
            MENU
          </span>
          <button
            aria-label="Đóng drawer"
            className="w-10 h-10 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all rounded-xl flex justify-center items-center"
            onClick={toggleDrawer}
          >
            <CiTextAlignLeft size={20} />
          </button>
        </div>

        {/* Nội dung menu */}
        <div className="flex-1 overflow-y-auto py-4">
          <Nav />
        </div>

        {/* Footer của Drawer (Tùy chọn) */}
        <div className="p-6 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          Japanese Flashcard v2.0
        </div>
      </div>
    </>
  );
}
export default Drawer;
