import React, { useState, useRef } from "react";
import { useLogout } from "@refinedev/core";
import { ROUTES } from "@/routes/config/constants";
import { Identity } from "@/types";
import { Link } from "react-router-dom";

export const Navbar = ({ user }: { user?: Identity }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatar = "https://randomuser.me/api/portraits/men/32.jpg";

  const { mutate } = useLogout();

  // Cierra el menú si se hace click fuera
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full h-16 min-h-16 max-h-16 bg-white shadow-md border-b border-indigo-200/60 flex items-center justify-between px-6 lg:z-30 sticky top-0 left-0">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-indigo-700 hidden md:block">
          Banco Rioja SAU
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-black">
          Bienvenido,
          <span className="font-semibold text-indigo-600 ml-1">
            {user?.name}
          </span>
        </span>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 rounded-full transition-all"
            onClick={() => setOpen((v) => !v)}
          >
            <img
              src={avatar}
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-indigo-600 object-cover shadow-md hover:border-indigo-700 transition-all"
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-indigo-200 z-40 animate-fade-in overflow-hidden">
              <div className="px-4 py-2 border-b border-indigo-100 mb-1 bg-gradient-to-r from-indigo-100 to-white">
                <p className="text-sm font-medium text-indigo-900 truncate">
                  {user?.name || "Usuario"}
                </p>
                <p className="text-xs text-indigo-500 truncate">
                  {user?.email || "usuario@ejemplo.com"}
                </p>
              </div>
              <Link
                to={ROUTES.ACCOUNT.LIST}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-indigo-50 hover:text-indigo-700 text-indigo-600 transition-colors"
              >
                <svg
                  className="h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Mi cuenta</span>
              </Link>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2.5 hover:bg-red-50 hover:text-red-600 text-indigo-600 transition-colors border-t border-indigo-100 mt-1"
                onClick={() => {
                  mutate();
                }}
              >
                <svg
                  className="h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2a1 1 0 00-1 1v1a1 1 0 002 0V6a1 1 0 00-1-1zm-2 5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-3 2a1 1 0 100 2h8a1 1 0 100-2H5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
