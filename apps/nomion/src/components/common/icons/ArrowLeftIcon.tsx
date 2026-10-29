import React from "react";

const ArrowLeftIcon = ({ width = "25", height = "24", color = "#F0F0F0" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        d="M21 12H3M9 6l-6 6 6 6"
      ></path>
    </svg>
  );
}

export default ArrowLeftIcon;
