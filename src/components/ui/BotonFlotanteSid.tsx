import React from "react";
import { leftFlotantArrowIcon } from "../icons/CollapseSidebarIcon";

export const BotonFlotanteSid = ({
  handleSidebarToggle,
  sidebarVisible,
}: {
  handleSidebarToggle: () => void;
  sidebarVisible: boolean;
}) => {
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
          onClick={handleSidebarToggle}
          aria-label={sidebarVisible ? "Ocultar menú" : "Mostrar menú"}
        >
          {leftFlotantArrowIcon(!sidebarVisible)}
        </button>
      </div>
    </>
  );
};
