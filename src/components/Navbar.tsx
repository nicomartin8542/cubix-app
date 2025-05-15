import React, { useState, useRef } from "react";

interface NavbarProps {
  user: {
    name: string;
    avatar: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className="w-full h-16 min-h-16 max-h-16 bg-white shadow flex items-center justify-end px-4 z-30 sticky top-0 left-0">
      <div className="flex items-center gap-4">
        <span className="hidden md:block font-medium text-indigo-700">
          {user.name}
        </span>
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setOpen((v) => !v)}
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-indigo-500 object-cover"
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 border z-40 animate-fade-in">
              <a
                href="/account"
                className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 text-gray-700"
              >
                Mi cuenta
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 text-indigo-600"
                onClick={() => {
                  /* logout aquí */
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
