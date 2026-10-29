/* eslint-disable @next/next/no-title-in-document-head */
import React from "react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
