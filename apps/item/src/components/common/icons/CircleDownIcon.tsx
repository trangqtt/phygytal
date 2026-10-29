import React from "react";

function CircleDownIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="1.333"
        d="M16 10v12M12 18l4 4 4-4"
      ></path>
      <path
        stroke="#fff"
        strokeWidth="1.333"
        d="M16 2.667C8.636 2.667 2.666 8.637 2.666 16c0 7.364 5.97 13.333 13.334 13.333 7.363 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CircleDownIcon;
