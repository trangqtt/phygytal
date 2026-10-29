import { likeProductItem } from "@/apis/product";
import { useHomepageAttributes } from "@/hooks/usePageAttributes";
import { selectUserUId } from "@/redux/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoffeeSwiper from "./CoffeeSwiper";
import ProductInfo from "./ProductInfo";
import CraftsmenDialog from "./CraftsmenDialog";
import { itemUrl } from "@/constant";
import ProductDescriptionDialog from "./ProductDescriptionDialog";
import { useRouter } from "next/router";
import { getCompetitionItems } from "@/apis/competition";
import { savePageInfo } from "@/redux/pageSlice";
import Layout from "@/components/common/Layout/Layout";
import { ProductTag } from "@/models/Product";
import { useTranslation } from "next-i18next";
import { usePathname, useSearchParams } from "next/navigation";
import coffeeData from "./data";

function parseIndex(index: string | null) {
  if (!index) {
    return 0;
  }

  try {
    const selectedIndex = parseInt(index);
    return selectedIndex >= 0 ? selectedIndex : 0;
  } catch (e: any) {
    return 0;
  }
}

export default function LeJGallery() {
  const [authorizerDialogOpen, setAuthorizerDialogOpen] =
    useState<boolean>(false);
  const userUID = useSelector(selectUserUId);
  const queryClient = useQueryClient();
  const [isViewMoreDescription, setIsViewMoreDescription] =
    useState<boolean>(false);
  const [isExpandDetail, setIsExpandDetail] = useState<boolean>(true);
  const [currentCreationIndex, setCurrentCreationIndex] = useState<number>(0);
  const { t } = useTranslation();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();

  useEffect(() => {
    const index = parseIndex(searchParams.get("index"));
    setCurrentCreationIndex(index);
  }, []);

  const handleChangeCreation = (index: number) => {
    const params = new URLSearchParams();
    params.set("index", index.toString());
    const newUrl = pathname + "?" + params.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
    setCurrentCreationIndex(index);
  };

  const dispatch = useDispatch();
  const { query } = useRouter();
  const { org, id, page } = query;

  const {
    data: competitionItemsData,
    isFetched,
    refetch,
  } = useQuery(["competition-items"], () => getCompetitionItems(), {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetched) {
      dispatch(
        savePageInfo({
          org,
          id,
          story: competitionItemsData,
        })
      );
    }
  }, [dispatch, id, org, competitionItemsData, isFetched]);

  const { mutate } = useMutation((itemId: string) => likeProductItem(itemId), {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["productItemDetail"] });
      refetch();
    },
  });

  const onClickViewMore = () => {
    setIsViewMoreDescription(true);
  };

  const onCloseViewMore = () => {
    setIsViewMoreDescription(false);
  };

  const currentCoffeeProduct = coffeeData[currentCreationIndex];

  return (
    <Layout title={t("general.digitalAssetMuseum")!}>
      <div className="relative m-auto flex h-[100svh] overflow-y-hidden w-full max-w-[1440px] flex-col gap-[20px] px-[12px] py-[80px] lg:px-[40px]">
        <ProductInfo
          onClickViewmoreDescription={onClickViewMore}
          isExpandDetail={isExpandDetail}
          setIsExpandDetail={setIsExpandDetail}
          data={currentCoffeeProduct}
          setAuthorizerDialogOpen={setAuthorizerDialogOpen}
          likeHandle={mutate}
        />
        <div className="absolute bottom-0 left-0 h-fit w-full px-[24px] lg:px-[64px]">
          <CoffeeSwiper
            currentCoffeeIndex={currentCreationIndex}
            setCurrentCoffeeIndex={handleChangeCreation}
            setIsExpandDetail={setIsExpandDetail}
            data={coffeeData}
          />
        </div>
      </div>

      {/* for mobile */}
      <ProductDescriptionDialog
        description={currentCoffeeProduct?.description ?? ""}
        isViewMoreDescription={isViewMoreDescription}
        onCloseViewMore={onCloseViewMore}
      />
    </Layout>
  );
}
