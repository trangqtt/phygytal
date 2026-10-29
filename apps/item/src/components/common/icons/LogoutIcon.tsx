import React from "react";

function LogoutIcon({height=24,width=24,...rest}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#FF113C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.1 7.56c-.31-3.6-2.16-5.07-6.21-5.07h-.13c-4.47 0-6.26 1.79-6.26 6.26v6.52c0 4.47 1.79 6.26 6.26 6.26h.13c4.02 0 5.87-1.45 6.2-4.99M9 12h11.38M18.15 8.65L21.5 12l-3.35 3.35"
      ></path>
    </svg>
  );
}

export default LogoutIcon;
