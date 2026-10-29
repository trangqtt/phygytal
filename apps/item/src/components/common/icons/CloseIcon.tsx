import React from "react";

function CloseIcon(props: any) {
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
        stroke="#F0F0F0"
        strokeLinecap="round"
        strokeWidth="1.333"
        d="M23.543 23.543L8.457 8.457M23.542 8.458L8.457 23.543"
      ></path>
    </svg>
  );
}

export default CloseIcon;
