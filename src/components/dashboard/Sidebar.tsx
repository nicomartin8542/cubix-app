import React from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@/config/menuItems";
import { CollapsedIcon } from "../icons/CollapsedIcon";
import { CollapseSidebarIcon } from "../icons/CollapseSidebarIcon";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const handleToggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <aside
      className={`bg-white shadow h-full flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      } fixed md:static z-30`}
    >
      <div className="relative flex items-center justify-between p-4 border-b">
        <div
          className={`w-full transition-all duration-300 ${
            collapsed ? "px-1 hidden " : " md:block px-8"
          }`}
        >
          <Link
            to="/"
            className="block w-full text-2xl font-bold text-indigo-600"
          >
            CUBIX
          </Link>
        </div>
        <button
          onClick={onCollapse}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-100 focus:outline-none bg-white bg-opacity-80 ${
            collapsed ? "relative right-0" : ""
          }`}
        >
          <CollapseSidebarIcon />
        </button>
      </div>
      <nav className="flex-1 mt-2 mr-1 ml-1">
        <ul className="space-y-2 ">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleToggleMenu(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 ${
                      item.submenu.some((sub) => location.pathname === sub.path)
                        ? "bg-indigo-100 text-indigo-600 font-semibold"
                        : ""
                    } ${collapsed ? "justify-center" : ""}`}
                  >
                    {item.icon}
                    <span
                      className={
                        collapsed ? "hidden" : "block flex-1 text-left"
                      }
                    >
                      {item.name}
                    </span>
                    {!collapsed && (
                      <CollapsedIcon openMenu={openMenu} item={item} />
                    )}
                  </button>
                  {/* Submenu */}
                  {!collapsed && openMenu === item.name && (
                    <ul className="ml-6 mr-1 mt-1 space-y-1">
                      {item.submenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className={`block px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 ${
                              location.pathname === sub.path
                                ? "bg-indigo-100 text-indigo-600 font-semibold"
                                : ""
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item?.path || ""}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 ${
                    location.pathname === item?.path
                      ? "bg-indigo-100 text-indigo-600 font-semibold"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className={collapsed ? "hidden" : "block"}>
                    {item.name}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
