import React from "react";

const ArrowDownIcon = ({ width = "24", height = "25", color = "#bfbfbf" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 25"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 10.5l6 6 6-6"
      ></path>
    </svg>
  );
}

export default ArrowDownIcon;
