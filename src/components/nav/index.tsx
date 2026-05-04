import { NavLink } from "react-router";
import { CiShoppingTag } from "react-icons/ci";
import { useDrawer } from "../../core/contexts/DrawerContext";

function Nav() {
  const { closeDrawer } = useDrawer();
  const menuItems = [
    {
      path: "/hiragana-syllable",
      label: "Âm tiết Hiragana",
      icon: <CiShoppingTag size={20} />,
    },
    {
      path: "/hiragana-vocabulary",
      label: "Từ vựng Hiragana",
      icon: <CiShoppingTag size={20} />,
    },
  ];

  return (
    <nav className="flex flex-col gap-2 w-full">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-blue-50 text-blue-500 font-semibold border-r-4 border-blue-500"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`
          }
          onClick={closeDrawer}
        >
          <span className="flex-none">{item.icon}</span>
          <span className="text-sm whitespace-nowrap">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
