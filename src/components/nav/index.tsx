import { NavLink } from "react-router";
import { CiBookmark, CiBoxList, CiGrid41, CiTrophy } from "react-icons/ci"; // Đổi icon cho đa dạng
import { useDrawer } from "../../core/contexts/DrawerContext";

function Nav() {
  const { closeDrawer } = useDrawer();
  const menuItems = [
    {
      path: "/quick-recognition",
      label: "Kiểm tra phản xạ",
      icon: <CiTrophy size={22} />,
    },
    {
      path: "/hiragana-syllable",
      label: "Âm tiết Hiragana",
      icon: <CiGrid41 size={22} />,
    },
    {
      path: "/hiragana-vocabulary",
      label: "Từ vựng Hiragana",
      icon: <CiBookmark size={22} />,
    },
    {
      path: "/katakana-vocabulary",
      label: "Từ vựng Katakana",
      icon: <CiBoxList size={22} />,
    },
    {
      path: "/kanji-vocabulary",
      label: "Từ vựng Kanji",
      icon: <CiBookmark size={22} />,
    },
  ];

  return (
    <nav className="flex flex-col gap-2 w-full p-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
              isActive
                ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`
          }
          onClick={closeDrawer}
        >
          <span className="flex-none">{item.icon}</span>
          <span className="text-sm font-bold tracking-tight">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
export default Nav;
