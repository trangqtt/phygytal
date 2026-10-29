"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { MENU_ITEMS } from "@/constant/MenuItems";

const Menu = () => {
  const [currentSection, setCurrentSection] = useState(MENU_ITEMS[0]);

  useEffect(() => {
    let sectionTopPositions: number[] = [];
    const fullScreenDiv =
      document.querySelector<HTMLDivElement>("#full-screen")!;

    const changeSectionPosition = () => {
      sectionTopPositions = MENU_ITEMS.map(({ id }) => {
        const section = document.querySelector<HTMLElement>(`#${id}`)!;
        return section.offsetTop;
      });
    };
    const handleScroll = () => {
      let i;
      for (i = 0; i < sectionTopPositions.length; i++) {
        if (sectionTopPositions[i] >= fullScreenDiv.scrollTop) break;
      }
      if (i === sectionTopPositions.length) i--;
      setCurrentSection(MENU_ITEMS[i]);
    };
    const handleResize = () => changeSectionPosition();

    changeSectionPosition();
    fullScreenDiv.addEventListener("scroll", debounce(handleScroll, 100));
    window.addEventListener("resize", debounce(handleResize, 100));
    return () => {
      fullScreenDiv.removeEventListener("scroll", debounce(handleScroll, 100));
      window.removeEventListener("resize", debounce(handleResize, 100));
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    document.getElementById(id)!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="w-60 h-60 fixed top-1/3 z-10 ml-4 hidden lg:block">
      {MENU_ITEMS.map(({ id, name }) => (
        <motion.a
          whileHover={{ scale: 1.2 }}
          key={id}
          onClick={() => handleScrollToSection(id)}>
          <div
            className={`min-h-[20px] border-l-2 pl-5 mb-4 cursor-pointer ${
              currentSection.id === id && "border-primary"
            }`}>
            {currentSection.id === id && (
              <motion.div
                transition={{
                  ease: "linear",
                  duration: 2,
                  x: { duration: 1 },
                }}
                className="text-secondary font-semibold">
                {name}
              </motion.div>
            )}
          </div>
        </motion.a>
      ))}
    </nav>
  );
};

export default Menu;
