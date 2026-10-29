import React, { ReactElement } from "react";

const KeyIcon = ({ width = "24", height = "24", fill = "#BFBFBF", ...rest }): ReactElement => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path stroke={fill} strokeLinecap="round" d="M21 16v-4h-9"></path>
      <path
        stroke={fill}
        d="M7 16a4 4 0 100-8 4 4 0 000 8z"
        clipRule="evenodd"
      ></path>
      <path stroke={fill} strokeLinecap="round" d="M17 15v-3"></path>
    </svg>
  );
}

export default KeyIcon;
