import Footer from "@/components/common/Footer";
import Layout from "@/components/common/Layout/Layout";
import { useTranslation } from "next-i18next";
import { FullScreen, FullScreenSection } from "@/components/common/FullScreen";
import Intro from "@/components/Section/Intro";
import Vision from "@/components/Section/Vision";
import Client from "@/components/Section/Client";
import Description from "@/components/Section/Description";
import Product from "@/components/Section/Product";
import { Leader, LeaderMobile } from "@/components/Section/Leader";

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <FullScreen>
        <FullScreenSection name="intro" theme="black">
          <Intro />
        </FullScreenSection>
        <FullScreenSection name="description">
          <Description />
        </FullScreenSection>
        <FullScreenSection name="approach" theme="black">
          <Vision />
        </FullScreenSection>
        <FullScreenSection name="client">
          <Client />
        </FullScreenSection>
        <FullScreenSection name="product" theme="black">
          <Product />
        </FullScreenSection>
        <FullScreenSection name="leader" showScrollDown={false} className="md:block hidden">
          <Leader />
        </FullScreenSection>
        <LeaderMobile />
        <section className="relative m-auto w-full snap-center snap-always">
          <Footer />
        </section>
      </FullScreen>
    </Layout>
  );
}
