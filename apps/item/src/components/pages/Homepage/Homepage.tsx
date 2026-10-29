import { claimProductItem, likeProductItem } from "@/apis/product";
import AuthModal from "@/components/AuthModal";
import ClaimModal from "@/components/ClaimModal/ClaimModal";
import BackdropLoader from "@/components/common/BackdropLoader/BackdropLoader";
import Button from "@/components/common/Button/Button";
import Video from "@/components/common/Video";
import { useProductStory } from "@/hooks/useProductStory";
import { selectUserUId, selectUser } from "@/redux/userSlice";
import { generateUrl } from "@/utils/url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { likeKey, showNFT } from "@/constant";
import OnChainInfo from "@/components/common/OnChainInfo";
import KeyIcon from "@/components/common/icons/KeyIcon";
import SwipeHomePage from "@/components/pages/SwipeHomePage";
import IntroThumbnail from "../SwipeHomePage/IntroThumbnail";
import QuotesOpen from "@/assets/images/quotes-open.png";
import QuotesClose from "@/assets/images/quotes-close.png";
import BackgroundNhandan from "@/assets/images/bg-nhandan.png";
import HandShakeIcon from "@/assets/images/handshake-icon.png";
import Link from "next/link";
import parse from "html-react-parser";
import TombPage from "../TombPage";
import NFCLoader from "@/components/common/Loader";

function getProductAttributeByKey(data: any, key: string) {
  return data[key];
}

export default function Homepage() {
  const [openClaim, setOpenClaim] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const userUID = useSelector(selectUserUId);
  const user = useSelector(selectUser);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isOpenLoader, setIsOpenLoader] = useState<boolean>(false);
  const [isLoadEnd, setIsLoadEnd] = useState<boolean>(false);
  const [userClaim, setUserClaim] = useState<string | null>(null);

  const { t } = useTranslation();

  const {
    org,
    chipId,
    ownerInfo,
    itemIndex,
    productItemId,
    isAstronautPage,
    isCoffeePage,
    isStonePage,
    mapping,
    isLoading,
    digitalAssetDetail,
    productDetail,
    isBaoNhanDan,
    isTombPage,
    pageAttributes: {
      home: { image: imageUrl, videoThumbnail, nextTitle, nextPath, stoneTags },
    },
  } = useProductStory();

  const mutationClaim = useMutation(
    (itemId: string) => claimProductItem(itemId),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["story"] });
      },
    }
  );

  const onClaimSuccess = () => {
    const userDisplay = user?.displayName || user?.email;
    setUserClaim(userDisplay);
  };

  const handleClaim = () => {
    if (!userUID) {
      setOpenAuth(true);
    } else {
      mutationClaim.mutate(productItemId!);
      onClaimSuccess();
    }
  };

  const onClickExploreStory = () => {
    setIsOpenLoader(true);
    const url = generateUrl(org, chipId, nextPath);

    if (!url) return;
    router.push(url);
  };

  useEffect(() => {
    if (!ownerInfo?.owner_id && !!mapping?.claimable) {
      setOpenClaim(true);
    }
  }, [mapping?.claimable, ownerInfo?.owner_id]);

  useEffect(() => {
    const viewedHomepage = localStorage.getItem("viewed-home-video");
    if (viewedHomepage) {
      setIsLoadEnd(true);
    }
  }, []);

  useEffect(() => {
    if (userUID) {
      setOpenAuth(false);
    }
  }, [userUID]);

  const onEndedVideo = () => {
    setIsLoadEnd(true);
  };

  return (
    <>
      {isLoading && <NFCLoader />}
      <BackdropLoader isOpen={mutationClaim.isLoading} />
      {isCoffeePage && !isLoadEnd && productDetail?.video?.url && (
        <IntroThumbnail video={productDetail?.video} onLoadEnd={onEndedVideo} />
      )}
      {!isLoading && isTombPage && <TombPage></TombPage>}

      {!isLoading && isBaoNhanDan && (
        <div className="relative flex h-[calc(100vh-80px)] flex-col justify-center overflow-hidden">
          <div className="z-[1] flex h-full max-h-full w-full max-w-[600px] flex-col items-center gap-[12px] pb-[14px] pt-[80px] sm:m-auto">
            <div className="relative flex w-full flex-1 flex-col justify-between">
              <div className="mt-2 px-6 py-2 text-sm md:text-base">
                <img src={QuotesOpen.src} alt="quotes-open" />
                {parse(
                  getProductAttributeByKey(productDetail?.attribute, "letter")
                )}
                <img
                  className="m-auto mr-0 flex"
                  src={QuotesClose.src}
                  alt="quotes-close"
                />
              </div>
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  className="object-fit absolute aspect-9/16 h-full w-full"
                  src={BackgroundNhandan.src}
                  alt="bg-nhandan"
                />
                <img
                  className="absolute aspect-9/16 h-full object-contain"
                  src={productDetail?.image?.url}
                  alt="newspaper"
                />
              </div>
              <div className="flex flex-col items-center gap-2 px-4">
                <div className="flex w-full gap-2 text-sm md:text-base">
                  <div className="flex w-1/3 items-center justify-center whitespace-nowrap rounded bg-red-bold px-6 py-2">
                    <Link
                      href={getProductAttributeByKey(
                        productDetail?.attribute,
                        "digital_url"
                      )}
                      target="_blank"
                      className="cursor-pointer hover:underline"
                    >
                      Đọc báo
                    </Link>
                  </div>
                  <div className="flex w-1/3 cursor-pointer items-center justify-center whitespace-nowrap rounded bg-red-bold px-6 py-2 hover:opacity-70">
                    <Link
                      href={getProductAttributeByKey(
                        productDetail?.attribute,
                        "video_url"
                      )}
                      target="_blank"
                    >
                      Xem video
                    </Link>
                  </div>
                  <div className="flex w-1/3 cursor-pointer items-center justify-center whitespace-nowrap rounded bg-red-bold px-6 py-2 hover:opacity-70">
                    <Link
                      href={getProductAttributeByKey(
                        productDetail?.attribute,
                        "podcast_url"
                      )}
                      target="_blank"
                    >
                      Nghe podcast
                    </Link>
                  </div>
                </div>
                <div className="flex w-full gap-2 text-sm md:text-base">
                  <div className="flex w-1/2 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-solid border-neutral-4 px-6 py-2 text-black hover:opacity-70">
                    <img src={HandShakeIcon.src} alt="handshakeicon" />
                    <p className="text-black">Gặp tác giả</p>
                  </div>
                  <div className="flex w-1/2 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border border-solid border-neutral-4 px-6 py-2 text-black hover:opacity-70">
                    <img
                      src={getProductAttributeByKey(
                        productDetail?.attribute,
                        "library_image_url"
                      )}
                      alt="Nha Bao Le Quoc Minh"
                      className="h-6 w-6 object-contain"
                    />
                    <p className="text-black">Thư viện cá nhân</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !isStonePage && !isBaoNhanDan && !isTombPage && (
        <div className="relative flex h-[100vh] flex-col justify-center overflow-hidden">
          <div className="z-[1] flex h-full max-h-full w-full max-w-[600px] flex-col items-center gap-[12px] pb-[14px] pt-[80px] sm:m-auto">
            <div className="relative max-h-[500px] min-h-[250px] w-full flex-1">
              {productDetail?.video?.url && isAstronautPage ? (
                <Video
                  videoUrl={productDetail?.video?.url}
                  thumbnailUrl={productDetail?.video?.thumbnail_url}
                  muted
                  loop={true}
                />
              ) : (
                productDetail?.image?.url && (
                  <img
                    src={productDetail?.image.url}
                    alt={org}
                    className="m-auto h-full w-auto object-contain"
                  />
                )
              )}
            </div>
            <div className="flex h-fit w-full flex-col items-start justify-between gap-[17px] px-[24px]">
              {((Number(productDetail?.total_item) > 0 && itemIndex) ||
                isAstronautPage) && (
                <div
                  className={clsx(
                    "flex w-full items-center justify-start gap-[8px]"
                  )}
                >
                  {isAstronautPage && (
                    <>
                      <div className="flex h-full w-fit items-center rounded-[2px] bg-[#1f1f1f] px-[8px] py-[2px]">
                        <p className="text-[12px] font-medium uppercase leading-[18px] text-[#bfbfbf]">
                          Quà lưu niệm
                        </p>
                      </div>
                    </>
                  )}
                  {!isAstronautPage ? (
                    <>
                      <div className="h-fit w-fit rounded-[4px] border border-lesslightgrey px-[12px] py-[3px]">
                        <p className="text-[12px] font-semibold leading-[18px] text-[#f0f0f0]">
                          {t("general.package")} {itemIndex}/
                          <span className="text-[#8c8c8c]">
                            {productDetail?.total_item}
                          </span>
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              )}
              <div className="flex w-full items-center justify-between">
                <h2 className="text-[24px] font-semibold capitalize leading-[30px]">
                  {productDetail?.product_name}
                </h2>
              </div>
              {(ownerInfo?.owner_id || userClaim) && (
                <>
                  {!showNFT && (
                    <div className="flex w-full items-center justify-start">
                      <p className="flex items-center gap-[8px] text-[14px] font-light leading-[22px] text-[#bfbfbf]">
                        <KeyIcon /> |{" "}
                        {isAstronautPage ? "Chủ sỡ hữu" : t("general.ownedBy")}{" "}
                        <span className="font-semibold text-[#f0f0f0] underline">
                          {ownerInfo?.full_name || ownerInfo?.email}
                        </span>
                      </p>
                    </div>
                  )}

                  {showNFT && (
                    <div className="z-50 flex w-full items-center justify-start">
                      <p className="flex items-center gap-[8px] text-[14px] font-light leading-[22px] text-[#bfbfbf]">
                        {digitalAssetDetail &&
                          digitalAssetDetail.status === "Active" && (
                            <OnChainInfo
                              data={{
                                chain: digitalAssetDetail.chain,
                                collection: digitalAssetDetail.collection_name,
                                contractAddress:
                                  digitalAssetDetail.contract_address,
                                tokenStandard: digitalAssetDetail.standard,
                                owner:
                                  ownerInfo?.full_name! || ownerInfo?.email!,
                                tokenId: digitalAssetDetail.token_id,
                              }}
                              anchorElement={
                                <>
                                  {isAstronautPage
                                    ? "Chủ sỡ hữu"
                                    : t("general.ownedBy")}{" "}
                                  <span className="font-semibold text-[#f0f0f0] underline">
                                    {ownerInfo?.full_name ||
                                      ownerInfo?.email ||
                                      userClaim}
                                  </span>
                                </>
                              }
                            />
                          )}
                      </p>
                    </div>
                  )}
                </>
              )}
              <div className="flex h-full w-full items-center justify-between gap-[10px]">
                <Button
                  type="submit"
                  fluid={true}
                  className="rounded-[4px] uppercase"
                  onClick={onClickExploreStory}
                >
                  {nextTitle}
                </Button>
                {!ownerInfo?.owner_id && !!mapping?.claimable && (
                  <Button variant="secondary" onClick={handleClaim}>
                    {isAstronautPage ? "Nhận quà" : t("general.claim")}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <ClaimModal
            imageUrl={imageUrl ?? videoThumbnail}
            open={openClaim && (imageUrl || videoThumbnail)}
            onClose={() => setOpenClaim(false)}
            onClaim={onClaimSuccess}
          />
          <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
        </div>
      )}

      {!isLoading && isStonePage && productDetail?.three_dimension?.url && (
        <SwipeHomePage
          stoneTags={stoneTags}
          digitalAssetDetail={digitalAssetDetail}
        />
      )}
    </>
  );
}
