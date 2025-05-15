import React from "react";
import { Link, useLocation } from "react-router-dom";
import { EmpleadoIcon } from "./icons/EmpleadoIcon";

interface SidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const menuItems = [
  {
    name: "Presentaciones",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 4v4m0 0h4m-4 0H8"
        />
      </svg>
    ),
    submenu: [
      { name: "Sueldo", path: "/sueldo" },
      { name: "Litis", path: "/litis" },
    ],
  },
  {
    name: "Instituciones",
    path: "/instituciones",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"
        />
      </svg>
    ),
  },

  {
    name: "Empleados",
    path: "/empleados",
    icon: <EmpleadoIcon />,
  },
];

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
      <div className="flex items-center justify-between p-4 border-b">
        <span
          className={`text-xl font-bold text-gray-800 transition-all duration-300 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          CUBIX
        </span>
        <button
          onClick={onCollapse}
          className="p-1 rounded hover:bg-gray-100 focus:outline-none"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
          </svg>
        </button>
      </div>
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
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
                      <svg
                        className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                          openMenu === item.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                  {/* Submenu */}
                  {!collapsed && openMenu === item.name && (
                    <ul className="ml-7 mt-1 space-y-1">
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
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700 ${
                    location.pathname === item.path
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
