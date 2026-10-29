import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FarmSection from "./sections/FarmSection";
import LocationSection from "./sections/LocationSection";
import PreProcessSection from "./sections/PreProcessSection";
import Loader from "@/components/common/Loader";
import { useProductStory } from "@/hooks/useProductStory";

interface SectionItemProps {
  imgSrc?: any;
  children?: React.ReactNode;
  onEnterViewport?(): void;
}

export function SectionItem({
  imgSrc,
  children,
  onEnterViewport = () => {},
}: SectionItemProps) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionRefCurrent = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEnterViewport(); // Call the provided callback when section enters the viewport
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as per your requirements
    );

    if (sectionRefCurrent) {
      observer.observe(sectionRefCurrent);
    }

    return () => {
      if (sectionRefCurrent) {
        observer.unobserve(sectionRefCurrent);
      }
    };
  }, [onEnterViewport]);

  return (
    <section
      className="relative flex h-screen w-full snap-center snap-always overflow-auto"
      ref={sectionRef}
    >
      {imgSrc && (
        <div className="image-wrapper relative w-full">
          <img
            src={imgSrc}
            alt="info tha1"
            className="h-full w-full object-fill"
          />
        </div>
      )}

      {!imgSrc && children}
    </section>
  );
}

export default function Index() {
  const {
    isLoading,
    productDetail,
    pageAttributes: {
      story: {
        farmUrl,
        fact1Title,
        fact1Description,
        fact2Title,
        fact2Description,
        fact3Description,
        farmShortDescription,
        farmFullDescription,
        preProcessingImageUrl,
        preProcessingDescription,
        preProcessingName,
      },
    },
  } = useProductStory();

  const { attribute } = productDetail || {};

  const {
    acidity,
    sweet,
    bitter,
    country_image,
    country_name,
    country_video,
    farm_area,
    farm_height,
    farm_name,
    farm_video,
  } = attribute || {};

  const [farmInviewport, setFarmInviewport] = useState(false);
  const [preProcessInviewport, setpreProcessInviewport] = useState(false);

  const handleFarmSectionEnterViewport = () => {
    setFarmInviewport(true);
  };

  const handlePreProcessEnterViewport = () => {
    setpreProcessInviewport(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="info relative h-[100vh] snap-both snap-mandatory overflow-x-hidden overflow-y-scroll">
          <SectionItem>
            <LocationSection
              inViewport={true}
              countryVideoUrl={country_video?.url}
              countryVideoThumbnailUrl={country_video?.thumbnail_url}
              imageUrl={country_image?.url}
              country={country_name}
              fact1Title={fact1Title}
              fact1Description={fact1Description}
              fact2Title={fact2Title}
              fact2Description={fact2Description}
              fact3Description={fact3Description}
            />
          </SectionItem>

          <SectionItem onEnterViewport={handleFarmSectionEnterViewport}>
            <FarmSection
              inViewport={farmInviewport}
              imageUrl={farmUrl}
              farmVideoUrl={farm_video?.url}
              farmVideoThumbnailUrl={farm_video?.thumbnail_url}
              farmName={farm_name}
              farmHeight={farm_height}
              farmArea={farm_area}
              farmDescription={farmFullDescription}
              farmShortDescription={farmShortDescription}
            />
          </SectionItem>

          <SectionItem onEnterViewport={handlePreProcessEnterViewport}>
            {preProcessInviewport && (
              <PreProcessSection
                preProcessingName={preProcessingName}
                preProcessingImageUrl={preProcessingImageUrl}
                preProcessingAcidity={acidity ?? ""}
                preProcessingSweet={sweet ?? ""}
                preProcessingBitter={bitter ?? ""}
                preProcessingDescription={preProcessingDescription}
              />
            )}
          </SectionItem>
          {/* <SectionItem>
            <IntroSection />
          </SectionItem>
          <SectionItem>
            <PrepareSection />
          </SectionItem> */}
        </div>
      )}
    </>
  );
}
