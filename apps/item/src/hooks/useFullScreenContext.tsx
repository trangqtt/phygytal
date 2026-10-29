import { Section } from "@/components/common/SectionFullScreen/SectionFullScreen";
import { createContext, useContext, useState } from "react";

const FullScreenContext = createContext<any>(undefined);

export function FullScreen({ children }: any) {
  const [currentSection, setCurrentSection] = useState<Section | string>(Section.Home);

  return (
    <FullScreenContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </FullScreenContext.Provider>
  );
}

export function useFullScreenContext(section?: Section | string) {
  const { currentSection, setCurrentSection } = useContext(FullScreenContext);
  return {
    currentSection,
    setCurrentSection,
    isInViewport: currentSection === section,
  };
}
