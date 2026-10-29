import Image from "next/image";
import { useState } from "react";
import BackdropLoader from "@/components/common/BackdropLoader/BackdropLoader";
import { useProductStory } from "@/hooks/useProductStory";

export default function AboutPage() {
  const {
    pageAttributes: {
      about: { title, description, imageUrl },
    },
  } = useProductStory();


  return (
    <div className="about-us relative h-full w-full pt-[100px]">
      <div className="relative h-[300px] w-full">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="About"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="z-[2] flex h-full w-full flex-col p-[24px] pt-[20px] text-center">
        {title && (
          <div
            className="about-title mb-[16px] text-[24px] font-semibold"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        )}
        {description && (
          <div
            className="about-description text-left text-[16px] font-light leading-[24px]"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
      </div>
    </div>
  );
}
