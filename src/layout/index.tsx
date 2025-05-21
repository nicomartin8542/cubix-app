import type { PropsWithChildren } from "react";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useLogout } from "@refinedev/core";
import { useUser } from "@/context/UserContext";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    // Recuperar el estado desde localStorage si existe
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });

  const { user } = useUser();

  // Guardar el estado en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const { mutate: logout } = useLogout();
  if (!user?.institucion_id) logout;

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden">
      <Sidebar collapsed={collapsed} onCollapse={handleCollapse} />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <Navbar user={user || undefined} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  );
};
