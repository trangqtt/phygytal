import React from "react";

const ArrowRightIcon = ({ width = "25", height = "24", color = "#F0F0F0" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 25 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        d="M3.5 12h18M15.5 18l6-6-6-6"
      ></path>
    </svg>
  );
}

export default ArrowRightIcon;
