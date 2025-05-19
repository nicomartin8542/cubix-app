import React from "react";

export const CollapsedIcon = ({ openMenu, item }: any) => {
  return (
    <>
      <svg
        className={`w-4 h-4 ml-auto transition-transform duration-200 ${
          openMenu === item.name ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </>
  );
};
