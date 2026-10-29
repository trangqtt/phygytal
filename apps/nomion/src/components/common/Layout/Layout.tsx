import React from "react";
import Header from "../Header";
import Footer from "@/components/common/Footer";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <div className="bg-body-mobile md:bg-none bg-repeat-round bg-cover">
      <Header title={title} />
      <main className="main min-h-[100svh]">{children}</main>
      <Footer />
    </div>
  );
}
