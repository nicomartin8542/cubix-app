import React from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@/config/menuItems";
import { CollapsedIcon } from "../icons/CollapsedIcon";
import { BankIcon } from "../icons/BankIcon";
import {
  leftArrowIcon,
  leftFlotantArrowIcon,
  rightArrowIcon,
} from "../icons/CollapseSidebarIcon";

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
      className={`bg-gradient-to-b from-indigo-600 to-indigo-800 h-full flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } fixed md:static z-30 shadow-lg`}
    >
      {/* Header con logo y botón de colapsar */}
      <div className="flex items-center justify-between h-16 px-2 border-b border-indigo-500/20">
        <Link
          to="/"
          className={`flex items-center gap-2 py-2 ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-md overflow-hidden">
            <BankIcon />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl text-white tracking-tight">
              CUBIX
            </span>
          )}
        </Link>
        {/* Botón para colapsar cuando está expandido */}
        {!collapsed && (
          <button
            className="p-1.5 rounded-md hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
            onClick={onCollapse}
            aria-label="Colapsar menú"
          >
            {leftArrowIcon()}
          </button>
        )}
      </div>

      {/* Botón para expandir cuando está colapsado */}
      {collapsed && (
        <button
          className="mx-auto mt-4 p-1.5 rounded-md hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
          onClick={onCollapse}
          aria-label="Expandir menú"
        >
          {rightArrowIcon()}
        </button>
      )}
      {/* Botón flotante para dispositivos pequeños */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          onClick={onCollapse}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {leftFlotantArrowIcon(collapsed)}
        </button>
      </div>

      <nav className="flex-1 mt-3 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400/30 scrollbar-track-transparent text-white font-bold">
        <ul className="space-y-1.5 ">
          {menuItems.map((item) => (
            <li key={item.name} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => handleToggleMenu(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white text-indigo-100 ${
                      item.submenu.some((sub) => location.pathname === sub.path)
                        ? "bg-white/20 text-white font-medium shadow-sm"
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
                    <ul className="ml-7 pl-2 mt-1 space-y-1 border-l-2 border-indigo-300/30 py-1">
                      {item.submenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            to={sub.path}
                            className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white text-indigo-200 ${
                              location.pathname === sub.path
                                ? "bg-white/10 text-white font-medium"
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/10 hover:text-white text-indigo-100 ${
                    location.pathname === item?.path
                      ? "bg-white/20 text-white font-medium shadow-sm"
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
