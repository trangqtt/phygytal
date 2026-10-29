import React from "react";

function EmailIcon({ height = "20", width = "20" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="#BFBFBF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.25"
        d="M14.166 17.083H5.833c-2.5 0-4.167-1.25-4.167-4.166V7.083c0-2.916 1.667-4.166 4.167-4.166h8.334c2.5 0 4.166 1.25 4.166 4.166v5.834c0 2.916-1.666 4.166-4.166 4.166z"
      ></path>
      <path
        stroke="#BFBFBF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.25"
        d="M14.167 7.5l-2.608 2.083c-.859.684-2.267.684-3.126 0L5.833 7.5"
      ></path>
    </svg>
  );
}

export default EmailIcon;
