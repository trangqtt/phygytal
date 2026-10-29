import React from "react";

const SignoutIcon = ({ width = "24", height = "24", color = "#F0F0F0", ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        fillRule="evenodd"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 4v16H4V4h11z"
        clipRule="evenodd"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        d="M12.5 12h9M18.5 15l3-3-3-3"
      ></path>
    </svg>
  );
}

export default SignoutIcon;
