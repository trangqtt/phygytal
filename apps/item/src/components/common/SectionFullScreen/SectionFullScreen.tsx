import { useFullScreenContext } from "@/hooks/useFullScreenContext";
import { useEffect, useRef } from "react";

export enum Section {
  Home = "home",
  Craftmen = "craftsmen",
  PrizeFirstSlide = "prize-first-slide",
  PrizeSecondSlide = "prize-second-slide",
  Contact = "contact",
  TypicalWork = "typical_works",
  TypicalWorkFirstSlide = "typical_works_first_slide",
  CraftVillage = "craft_village",
  StoneInfo = "stone_info",
  ProductProcessFirstSlide = "product_process_first_slide",
  ProductProcessSecondSlide = "product_process_second_slide",
  ArtistPrizesFirstSlide = "artist_prizes_first_slide",
  ArtistPrizesSecondSlide = "artist_prizes_second_slide",
  Info = "info",
  ProductOriginFirstSlide = 'craft_village',
  ProductOriginSecondSlide = 'product_origin_second_slide',
  ProductOriginHighLightFirstSlide = 'product_origin_highlight_first_slide',
  ProductOriginHighLightSecondSlide = 'product_origin_highlight_second_slide',
}

function SectionFullScreen({
  name,
  showScrollGuide = false,
  children,
  index,
}: {
  name?: string;
  showScrollGuide?: boolean;
  children: React.ReactNode;
  index?: number;
}) {
  const id = index !== undefined ? `${name}-${index}` : name
  const sectionRef = useRef(null);
  const { setCurrentSection } = useFullScreenContext()

  useEffect(() => {
    const sectionRefCurrent = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(name); // Call the provided callback when section enters the viewport
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
  }, []);

  return (
    <section
      id={id}
      className="relative h-[100vh] w-full max-w-[600px] m-auto snap-center snap-always"
      ref={sectionRef}
    >
      {children}
    </section>
  );
}

export default SectionFullScreen;
