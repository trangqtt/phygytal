import React from "react";

const KyokaiIcon = ({ width = 32, height = 32 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect width="32" height="32" fill="#595959" rx="16"></rect>
      <path
        fill="#E2E4E8"
        d="M6 12.02l3.453 7.761 5.778 5.71L9.493 7.78 6 12.021zM11.642 7.303l1.997 6.211 1.25.455 1.47-4.65-4.717-2.016zM26 13.149l-2.804 3.863-6.325-2.29 1.778-5.54 4.923-1.264 2.427 5.23zM21.897 18.825l-4.512 6.222-2.907-8.889 7.42 2.667z"
      ></path>
      <path
        fill="#CACED6"
        d="M14.205 9.902l.684 4.068 1.47-4.65-2.154.582z"
      ></path>
      <path
        fill="#F2F3F4"
        d="M13.64 13.514l1.25.455-.684-4.068-2.564-2.598 1.997 6.211z"
      ></path>
      <path
        fill="#CACED6"
        d="M12.035 15.629l-2.582 4.153L6 12.022l6.035 3.607z"
      ></path>
      <path
        fill="#F2F3F4"
        d="M18.649 9.184l2.325 3.521-4.103 2.017 1.778-5.538z"
      ></path>
      <path
        fill="#F7F8F9"
        d="M23.573 7.918l-2.599 4.786-2.325-3.521 4.924-1.265z"
      ></path>
      <path
        fill="#CACED6"
        d="M23.196 17.013l-2.222-4.308 5.025.444-2.803 3.864z"
      ></path>
      <path
        fill="#F2F3F4"
        d="M17.555 19.577l-.17 5.47-2.907-8.889 3.077 3.419z"
      ></path>
      <path
        fill="#CACED6"
        d="M17.385 25.046l.17-5.47 4.343-.752-4.513 6.222zM15.23 25.49l-5.777-5.709 4.172.753 1.606 4.957z"
      ></path>
    </svg>
  );
};

export default KyokaiIcon;
