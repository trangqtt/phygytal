import Intro from "@/components/common/section/Intro";
import BackgroundStory from "@/components/common/section/BackgroundStory";
import Description from "@/components/common/section/Description";
import Showcase from "@/components/common/section/Showcase";
import Partner from "@/components/common/section/Partner";
import Documentary from "@/components/common/section/Documentary";

export interface MenuItem {
  id: string;
  name: string;
  component: JSX.Element;
  showScrollDown?: boolean;
}

export const MENU_ITEMS: Readonly<MenuItem[]> = Object.freeze([
  {
    id: "intro",
    name: "Giới thiệu",
    component: <Intro />,
    showScrollDown: true,
  },
  {
    id: "description",
    name: "Về Tầm Chân",
    component: <Description />,
  },
  {
    id: "background-story",
    name: "Nghề",
    component: <BackgroundStory />,
  },
  {
    id: "documentary",
    name: "Tư liệu",
    component: <Documentary />,
  },
  {
    id: "showcase",
    name: "Trưng bày",
    component: <Showcase />,
  },
  {
    id: "partner",
    name: "Về Phygital Labs & UNET",
    component: <Partner />,
  },
]);
