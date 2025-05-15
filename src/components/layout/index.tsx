import type { PropsWithChildren } from "react";
import React, { useState } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Para móvil
  const [sidebarMinimized, setSidebarMinimized] = useState(false); // Para desktop

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Desktop */}
      <aside
        className={`
          hidden md:flex md:flex-col bg-white border-r border-gray-200 shadow-lg z-20
          transition-all duration-300
          ${sidebarMinimized ? 'w-20' : 'w-64'}
        `}
      >
        <div className="h-16 flex items-center justify-between border-b border-gray-100 px-4">
          <span className={`font-bold text-xl text-indigo-700 tracking-wide transition-all duration-300 ${sidebarMinimized ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>CubixApp</span>
          <button
            className="p-2 rounded hover:bg-indigo-50 text-indigo-600 focus:outline-none"
            onClick={() => setSidebarMinimized((v) => !v)}
            aria-label="Minimizar sidebar"
          >
            {sidebarMinimized ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            )}
          </button>
        </div>
        <nav className={`flex-1 overflow-y-auto p-2 transition-all duration-300 ${sidebarMinimized ? 'px-0' : 'px-4'}`}>
          <Menu />
        </nav>
      </aside>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col animate-slide-in">
            <div className="h-16 flex items-center justify-between border-b border-gray-100 px-4">
              <span className="font-bold text-xl text-indigo-700 tracking-wide">CubixApp</span>
              <button
                className="p-2 rounded hover:bg-indigo-50 text-indigo-600 focus:outline-none"
                onClick={() => setSidebarOpen(false)}
                aria-label="Cerrar sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <Menu />
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="h-16 flex items-center justify-between bg-white border-b border-gray-200 px-4 shadow-sm z-10">
          <div className="flex items-center gap-2">
            {/* Botón para abrir sidebar en móvil */}
            <button
              className="md:hidden p-2 rounded hover:bg-indigo-50 text-indigo-600 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <Breadcrumb />
          </div>
          {/* Espacio para acciones, perfil, etc. */}
          <div className="flex items-center gap-3">
            {/* Ejemplo: avatar usuario */}
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              <span>CX</span>
            </div>
          </div>
        </header>
        {/* Contenido principal */}
        <main className="flex-1 p-6 md:p-10 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};
