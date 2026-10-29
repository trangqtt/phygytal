import Menu from "@/components/common/Menu";
import { FullScreenSection } from "@/components/common/FullScreen";
import { MENU_ITEMS } from "@/constant/MenuItems";

export default function Home() {
  return (
    <>
      <Menu />
      {MENU_ITEMS.map(({ id, component, showScrollDown }) => {
        return (
          <FullScreenSection
            key={id}
            name={id}
            showScrollDown={!!showScrollDown}>
            {component}
          </FullScreenSection>
        );
      })}
    </>
  );
}
