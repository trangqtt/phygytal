// @ts-nocheck
import ProductDetailBoard from "@/components/common/ProductDetailBoard";
import ProductImageSection from "@/components/common/ProductImageSection";
import ProductInformation from "@/components/common/ProductInformation";
import ThreeDCubeScanIcon from "@/components/common/icons/3DCubeScanIcon";
import ClockIcon from "@/components/common/icons/ClockIcon";
import ScaleIcon from "@/components/common/icons/ScaleIcon";
import { generateUrl } from "@/utils/url";
import { FC, useEffect, useState } from "react";
import { useProductStory } from "@/hooks/useProductStory";
import { useTranslation } from "react-i18next";
import SectionFullScreen, {
  Section,
} from "@/components/common/SectionFullScreen/SectionFullScreen";
import { ScrollGuide } from "@/components/common/ScrollGuide";
import { BaseSectionProps } from "@/models/SectionProps";
import IntroThumbnail from "../../SwipeHomePage/IntroThumbnail";
import { useAppStepContext } from "@/hooks/useAppStepContext";
import { Media } from "@/models/general";
import { motion } from "framer-motion";
import { PageSteps } from "@/models/general";

interface MetaInfo {
  reward: string;
  product_size: string;
  product_pedestalSize: string;
  product_weight: string;
  product_time: string;
}

interface HomeSectionData {
  name: string;
  tags: string[];
  meta_info: MetaInfo;
  video_intro_thumbnail: Media;
  asset_three_dimension: Media;
}

export interface HomeSectionProps extends BaseSectionProps {
  totalLike: number;
  onLike(): void;
  author: string;
  digitalAssetDetail: any;
  isLoaded3D: boolean;
  nextSlide?: Section;
}

const HomeSection: FC<HomeSectionProps> = (props) => {
  const {
    totalLike,
    onLike,
    author,
    digitalAssetDetail,
    isLoaded3D,
    sectionData,
    id,
  } = props;

  const { currentStep, setCurrentStep } = useAppStepContext();
  const [isLoading3D, setIsLoading3D] = useState<boolean>(true);

  const { org, chipId, themeDetail, productItemId } =
    useProductStory();

  const {
    tags,
    meta_info: metaInfo,
    author_label: authorLabel,
    show_nft: showNft,
    name,
    video,
    asset_three_dimension: asset3D,
  } = sectionData as HomeSectionData;

  const { t } = useTranslation();

  const getInfoUrl = () => {
    if (
      themeDetail?.pages &&
      themeDetail.pages?.findIndex((page) => page.type === "stone_info") !== -1
    ) {
      return generateUrl(org, chipId, "stone_info");
    }
    return "";
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading3D(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hasVideo = !!video?.url;
    setCurrentStep(hasVideo ? PageSteps.Video : PageSteps.Normal);
  }, []);

  return (
    <SectionFullScreen name={id} showScrollGuide>
      {currentStep === PageSteps.Video && video?.url && (
        <IntroThumbnail
          video={video}
          onLoadEnd={() => setCurrentStep(PageSteps.Normal)}
        />
      )}
      {currentStep === PageSteps.Normal && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: currentStep === PageSteps.Normal && !isLoading3D ? 1 : 0,
          }}
          className="relative m-auto flex h-[100svh] w-screen max-w-[600px] flex-col items-center px-[12px] py-[12px]"
        >
          <ProductImageSection
            isLoaded3D={isLoaded3D}
            totalLike={totalLike}
            productItemId={productItemId}
            rank={Number(metaInfo?.reward) ?? undefined}
            onLike={onLike}
            asset3D={asset3D as Media}
            productFlipSection={{
              front: (
                <model-viewer
                  ar
                  ar-scale="fixed"
                  camera-controls
                  auto-rotate
                  src={asset3D?.url}
                  alt="3D model"
                  disable-pan
                  disable-tap
                ></model-viewer>
              ),
              back: (
                <ProductDetailBoard
                  productDetail={[
                    {
                      label: "Kích thước",
                      value: `${metaInfo?.product_size}`,
                      Icon: <ThreeDCubeScanIcon />,
                    },
                    {
                      label: "Kích thước đế",
                      value: `${metaInfo?.product_pedestal_size}`,
                      Icon: <ThreeDCubeScanIcon />,
                    },
                    {
                      label: "Trọng lượng",
                      value: metaInfo?.product_weight,
                      Icon: <ScaleIcon />,
                    },
                    {
                      label: "Thời gian điêu khắc",
                      value: metaInfo?.product_time,
                      Icon: <ClockIcon />,
                    },
                  ]}
                />
              ),
            }}
          />
          <ProductInformation
            name={name}
            tags={tags}
            author={author}
            authorLabel={authorLabel}
            showNft={showNft}
            infoUrl={getInfoUrl()}
            digitalAssetDetail={digitalAssetDetail}
            isLoaded3D={isLoaded3D}
          />
          <ScrollGuide
            delay={1.2}
            isVisible={isLoaded3D}
            title={t("general.explore")}
          />
        </motion.div>
      )}
    </SectionFullScreen>
  );
};

export default HomeSection;
