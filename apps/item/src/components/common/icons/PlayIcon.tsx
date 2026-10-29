import React from "react";

const PlayIcon = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      {...rest}
    >
      <path
        fill="#F0F0F0"
        d="M8.334 20v-5.934c0-7.366 5.217-10.383 11.6-6.7l5.15 2.967 5.15 2.967c6.383 3.683 6.383 9.716 0 13.4l-5.15 2.966-5.15 2.967c-6.383 3.683-11.6.667-11.6-6.7V20z"
      ></path>
    </svg>
  );
}

export default PlayIcon;
