import SectionTitle from "@/components/pages/StoryPage/sections/SectionTitle";
import ScanErrorImage from "./images/error.png";
import Image from "next/image";
import Head from "next/head";

export default function ScanErrorPage() {
  return (
    <div className="relative h-[100vh] w-full pt-[100px]">
      <Head>
        <title>nomion.io - Tap physical item to explore</title>
      </Head>
      <SectionTitle title="Tap physical item to explore" />
      <div className="flex items-center justify-center mt-[50px]">
        <img src={ScanErrorImage.src} alt="Scan error" />
      </div>
    </div>
  );
}
