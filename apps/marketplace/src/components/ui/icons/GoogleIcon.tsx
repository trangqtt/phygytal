import React from "react";

function GoogleIcon({ width = "25", height = "24", ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 25 24"
      {...rest}
    >
      <path
        fill="#4285F4"
        fillRule="evenodd"
        d="M23.54 12.261c0-.815-.073-1.6-.21-2.352H12.5v4.449h6.189a5.29 5.29 0 01-2.295 3.47v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.452z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#34A853"
        fillRule="evenodd"
        d="M12.5 23.5c3.105 0 5.708-1.03 7.61-2.787l-3.716-2.885c-1.03.69-2.347 1.098-3.894 1.098-2.996 0-5.53-2.023-6.435-4.741H2.223v2.98A11.496 11.496 0 0012.5 23.5z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M6.065 14.185A6.913 6.913 0 015.705 12c0-.758.13-1.495.36-2.185v-2.98H2.223A11.495 11.495 0 001 12c0 1.856.444 3.612 1.223 5.165l3.842-2.98z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#EA4335"
        fillRule="evenodd"
        d="M12.5 5.074c1.688 0 3.204.58 4.396 1.72l3.298-3.299C18.203 1.64 15.6.5 12.5.5A11.496 11.496 0 002.223 6.835l3.842 2.98c.904-2.718 3.44-4.741 6.435-4.741z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default GoogleIcon;
