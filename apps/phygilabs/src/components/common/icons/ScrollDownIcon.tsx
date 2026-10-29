import React from "react";

function ScrollDownIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        stroke={props.theme === 'light' ? '#041e42' :"white"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        d="M15 10.834l-5 5-5-5"
      ></path>
      <path
        stroke={props.theme === 'light' ? 'grey' :"#BFBFBF"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        d="M15 4.167l-5 5-5-5"
      ></path>
    </svg>
  );
}

export default ScrollDownIcon;
