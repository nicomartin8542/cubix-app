import type { PropsWithChildren } from "react";
import React, { useState } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Navbar } from "../components/dashboard/Navbar";
import { useGetIdentity } from "@refinedev/core";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  // Simulación de usuario, reemplazar por datos reales de Refine/Auth cuando esté disponible
  const user = {
    name: "Juan Pérez",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden  border-indigo-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed((v) => !v)}
      />
      {/* Main content */}
      <section className="flex-1 h-full flex flex-col">
        <Navbar user={user} />
        <div className="flex-1 min-h-0">
          <main className="w-full h-full flex-1 overflow-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </section>
    </div>
  );
};
