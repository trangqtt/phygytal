import Head from "next/head";
import { FC } from "react";
import parse from "html-react-parser";
import Loader from "@/components/common/Loader";
import { useProductStory } from "@/hooks/useProductStory";

const LetterPage: FC = () => {
  const {
    isLoading,
    productDetail,
  } = useProductStory();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="about-us star-background relative m-auto h-full w-full max-w-[600px] pt-[100px]">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <Head>
            <title>Thư ngỏ</title>
            <meta property="og:title" content="Thư ngỏ" key="title" />
          </Head>
          <div className="relative flex h-full w-full flex-col gap-[20px] px-[16px] pt-[24px] text-[#f0f0f0]">
            {parse(productDetail?.attribute?.letter ?? "")}
          </div>
        </div>
      )}
    </>
  );
};

export default LetterPage;
