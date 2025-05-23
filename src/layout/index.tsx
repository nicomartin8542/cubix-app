import type { PropsWithChildren } from "react";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useLogout } from "@refinedev/core";
import { useUser } from "@/context/UserContext";
import { BotonFlotanteSid } from "@/components/ui/BotonFlotanteSid";

export const Layout: React.FC<PropsWithChildren> = () => {
  // Estado para controlar si el sidebar está visible (abierto) o no
  const [sidebarVisible, setSidebarVisible] = useState(() => {
    // En móviles, el sidebar está oculto por defecto
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return false;
    }
    // En desktop, usar la preferencia guardada o mostrar por defecto
    const savedState = localStorage.getItem("sidebarVisible");
    return savedState ? JSON.parse(savedState) : true;
  });

  // Estado para controlar si el sidebar está colapsado (estrecho) o expandido (ancho)
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  });

  const { user } = useUser();

  // Guardar los estados en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    localStorage.setItem("sidebarVisible", JSON.stringify(sidebarVisible));
  }, [sidebarVisible]);

  // En móviles, el botón flotante alterna la visibilidad del sidebar
  // En desktop, el botón colapsa/expande el sidebar
  const handleSidebarToggle = () => {
    if (isMobile) {
      // En móviles, solo alternar la visibilidad
      setSidebarVisible(!sidebarVisible);
    } else {
      // En desktop, alternar el estado colapsado
      setCollapsed(!collapsed);
    }
  };

  // Función específica para cerrar el sidebar en dispositivos móviles
  const handleCloseSidebar = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  // Función para manejar los clics en los elementos del menú
  // Esta función se pasa al componente Sidebar
  const handleMenuItemClick = () => {
    // En dispositivos móviles, cerrar el sidebar después de hacer clic en un elemento del menú
    if (isMobile) {
      setTimeout(() => {
        setSidebarVisible(false);
      }, 150); // Retraso para permitir que la navegación ocurra primero
    }
  };

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Solo colapsar automáticamente en pantallas pequeñas al cargar inicialmente
      // pero no cuando el usuario explícitamente cambia el estado
    };

    window.addEventListener("resize", handleResize);
    // Ejecutar una vez al inicio para establecer el estado correcto
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { mutate: logout } = useLogout();
  if (!user?.institucion_id) logout;

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden">
      {/* Overlay para cerrar el sidebar en dispositivos móviles */}
      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={handleCloseSidebar}
          aria-label="Cerrar menú"
        />
      )}

      {/* Sidebar - ahora con z-index más alto que el overlay */}
      <Sidebar
        collapsed={collapsed}
        onCollapse={handleSidebarToggle}
        onClose={handleCloseSidebar}
        onMenuItemClick={handleMenuItemClick}
        isMobile={isMobile}
        isVisible={isMobile ? sidebarVisible : true}
      />

      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <Navbar user={user || undefined} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Botón flotante para dispositivos móviles - siempre visible */}
      {isMobile && (
        <BotonFlotanteSid
          handleSidebarToggle={handleSidebarToggle}
          sidebarVisible={sidebarVisible}
        />
      )}
    </div>
  );
};
