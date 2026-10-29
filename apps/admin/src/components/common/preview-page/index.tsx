import { FC } from "react";
import HomePreview from '../../../resources/images/home-page.png'
import AboutPreview from '../../../resources/images/about.png'
import CraftVillagePreview from '../../../resources/images/carft-village.png'
import CraftmenPreview from '../../../resources/images/craftmen.png'
import TutorialPreview from '../../../resources/images/tutorial.png'
import StoryPreview from '../../../resources/images/story-page.png'
import LetterPreview from '../../../resources/images/letter.png'
import StoneInfoPreview from '../../../resources/images/stone-info.png'

export enum PreviewSize {
  Small = 'w-[50px] h-[100px]',
  Medium = 'w-[100px] h-[200px]',
  Large = 'w-[200px] h-[400px]'
}

export type PreviewPageProps = {
  type: string;
  size?: PreviewSize;
}

const PreviewPage: FC<PreviewPageProps> = (props) => {
  const { type, size = PreviewSize.Medium } = props;

  const generatePreviewImage = () => {
    switch (type) {
      case 'home':
        return HomePreview;
      case 'about':
        return AboutPreview;
      case 'story':
        return StoryPreview;
      case 'craftsmen':
        return CraftmenPreview;
      case 'craft_village':
        return CraftVillagePreview;
      case 'tutorial':
        return TutorialPreview;
      case 'letter':
        return LetterPreview;
      case 'stone_info':
        return StoneInfoPreview;
      default:
        return HomePreview;
    }
  };

  return <img src={generatePreviewImage()} className={size} />;
}

export default PreviewPage
