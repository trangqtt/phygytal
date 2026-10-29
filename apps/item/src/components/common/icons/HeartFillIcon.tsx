import React from "react";

function HeartFillIcon({ width = '33', height = '33', fill = '#F0F0F0', ...rest }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 33 33"
      {...rest}
    >
      <path
        fill={fill}
        d="M21.92 4.136A7.399 7.399 0 0016 7.109a7.399 7.399 0 00-5.92-2.973c-4.094 0-7.414 3.333-7.414 7.453 0 1.587.253 3.054.693 4.414 2.107 6.667 8.6 10.654 11.814 11.747.454.16 1.2.16 1.654 0 3.213-1.093 9.707-5.08 11.813-11.747.44-1.36.694-2.827.694-4.414 0-4.12-3.32-7.453-7.414-7.453z"
      ></path>
    </svg>
  );
}

export default HeartFillIcon;
