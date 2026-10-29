import { likeProductItem } from "@/apis/product";
import { useHomepageAttributes } from "@/hooks/usePageAttributes";
import { selectUserUId } from "@/redux/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsCarousel from "./ProductsCarousel";
import ProductDetailCard from "./ProductDetailCard";
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
import { Languages } from "@/models/General";

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

interface Props {
  collection: string;
}

export default function Stone2023({ collection }: Props) {
  const [openAuth, setOpenAuth] = useState(false);
  const [authorizerDialogOpen, setAuthorizerDialogOpen] =
    useState<boolean>(false);
  const userUID = useSelector(selectUserUId);
  const queryClient = useQueryClient();
  const [isViewMoreDescription, setIsViewMoreDescription] =
    useState<boolean>(false);
  const [isExpandDetail, setIsExpandDetail] = useState<boolean>(true);
  const { story } = useHomepageAttributes();
  const [currentCreationIndex, setCurrentCreationIndex] = useState<number>(0);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  // const [index, setIndex] = useState(0)

  useEffect(() => {
    const index = parseIndex(searchParams.get("index"));
    setCurrentCreationIndex(index);
  }, []);

  const dispatch = useDispatch();
  const { query } = useRouter();
  const { org, id, page } = query;

  const {
    data: competitionItemsData,
    isFetched,
    refetch,
  } = useQuery(
    ["competition-items", collection],
    () => getCompetitionItems(collection),
    {
      enabled: !!collection,
      keepPreviousData: false
    }
  );

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

  const handleChangeCreation = (index: number) => {
    const params = new URLSearchParams();
    params.set("index", index.toString());
    const newUrl = pathname + "?" + params.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
    setCurrentCreationIndex(index);
  };

  const currentCreation = ((story as ProductTag[]) || [])[currentCreationIndex];

  const onClickViewMore = () => {
    setIsViewMoreDescription(true);
  };

  const onCloseViewMore = () => {
    setIsViewMoreDescription(false);
  };

  const onClickExplore = () => {
    if (!currentCreation) return;

    const url = `${itemUrl}/stone/${currentCreation.tag_id}`;

    window.location.replace(url);
  };

  useEffect(() => {
    if (userUID) {
      setOpenAuth(false);
    }
  }, [userUID]);

  return (
    <Layout title={t("general.digitalAssetMuseum")!}>
      <div className="relative m-auto flex h-[100svh] w-full max-w-[1440px] flex-col gap-[20px] px-[12px] pt-[80px] lg:px-[40px]">
        {collection === "da-non-nuoc" && (
          <p className="text-[16px] font-bold uppercase leading-normal">
            | {t("general.sculptureContest")}
          </p>
        )}
        <ProductDetailCard
          onClickViewmoreDescription={onClickViewMore}
          isExpandDetail={isExpandDetail}
          setIsExpandDetail={setIsExpandDetail}
          data={currentCreation}
          setAuthorizerDialogOpen={setAuthorizerDialogOpen}
          likeHandle={mutate}
        />
        <div className="h-fit w-full">
          <ProductsCarousel
            currentCreationIndex={currentCreationIndex}
            setCurrentCreationIndex={handleChangeCreation}
            setIsExpandDetail={setIsExpandDetail}
            data={story}
          />
        </div>
      </div>

      <ProductDescriptionDialog
        description={
          currentCreation?.product_detail.attribute.translation[
            i18n.language as Languages
          ].description ?? ""
        }
        isViewMoreDescription={isViewMoreDescription}
        onClickExplore={onClickExplore}
        onCloseViewMore={onCloseViewMore}
      />

      <CraftsmenDialog
        authorizerDialogOpen={authorizerDialogOpen}
        setAuthorizerDialogOpen={setAuthorizerDialogOpen}
        data={currentCreation}
      />
    </Layout>
  );
}
