import React from "react";

function BurgerIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="14"
      fill="none"
      viewBox="0 0 24 14"
      {...props}
    >
      <path
        stroke="#F0F0F0"
        strokeLinecap="round"
        strokeWidth="1.333"
        d="M1.333 1.667h21.334M1.333 12.333h21.334"
      ></path>
    </svg>
  );
}

export default BurgerIcon;