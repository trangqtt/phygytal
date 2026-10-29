import "swiper/css";
import "swiper/css/pagination";

import Layout from "@/components/common/Layout/Layout";

import { ProductSection } from "./ProductItemSection";
import { CustomerSection } from "./CustomerSection";
import { HowItWorkSection } from "./HowItWorkSection";
import { HeroSection } from "./HeroSection";
import { SolutionSection } from "./SolutionSection";

export default function LandingPage() {
  return (
    <Layout>
      <HeroSection />
      <HowItWorkSection />
      <SolutionSection />
      <CustomerSection />
      <ProductSection />
    </Layout>
  );
}
