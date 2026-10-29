import React from "react";

function ProfileIcon(props: any) {
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
        d="M7.333 26s4.667-2 6-3.333c1.334-1.334-2.666-1.334-2.666-8C10.667 8 16 8 16 8s5.334 0 5.334 6.667c0 6.666-4 6.666-2.667 8C20 24 24.667 26 24.667 26"
      ></path>
      <path
        fillRule="evenodd"
        stroke="#F0F0F0"
        strokeWidth="1.333"
        d="M16 29.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333C8.636 2.667 2.666 8.637 2.666 16c0 7.364 5.97 13.333 13.334 13.333z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ProfileIcon;
