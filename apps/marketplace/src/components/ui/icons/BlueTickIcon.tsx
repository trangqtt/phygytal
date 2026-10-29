import React from "react";

function BlueTickIcon({ width = 24, height = 24, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      {...rest}
    >
      <path
        fill="#0080FF"
        d="M13.012 3.445c1.38-2.207 4.595-2.207 5.974 0a3.523 3.523 0 003.779 1.565c2.536-.585 4.81 1.688 4.224 4.224a3.522 3.522 0 001.565 3.779c2.207 1.38 2.207 4.594 0 5.974a3.522 3.522 0 00-1.565 3.779c.585 2.536-1.688 4.809-4.224 4.224a3.523 3.523 0 00-3.779 1.565c-1.38 2.207-4.594 2.207-5.974 0a3.523 3.523 0 00-3.778-1.566c-2.537.586-4.81-1.687-4.224-4.224a3.522 3.522 0 00-1.566-3.778c-2.207-1.38-2.207-4.594 0-5.974A3.523 3.523 0 005.01 9.234C4.425 6.698 6.697 4.425 9.234 5.01a3.523 3.523 0 003.778-1.565z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10.332 16l3.773 3.773 7.56-7.546"
      ></path>
    </svg>
  );
}

export default BlueTickIcon;
