import type { Metadata } from "next";
import "./globals.css";
import "./swiper.css";
import "swiper/css";
import "swiper/css/navigation";
import { FullScreen } from "@/components/common/FullScreen";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { lostTypeFont, btBeausans } from "@/assets/fonts";
import clsx from "clsx"

export const metadata: Metadata = {
  title: "Tầm Chân",
  icons: "/favicon.ico",
  description:
    "Dự án là kết quả hợp tác giữa start-up công nghệ Phygital Labs và Trung tâm thông tin UNESCO (UNET). Tầm Chân sử dụng các công nghệ “vật lý số” do công ty Phygital Labs phát triển nhằm lưu giữ, trưng bày, quảng bá và ứng dụng văn hóa truyền thống Việt Nam vào cuộc sống đương đại.",
  openGraph: {
    title: "Tầm Chân",
    description:
      "Dự án là kết quả hợp tác giữa start-up công nghệ Phygital Labs và Trung tâm thông tin UNESCO (UNET). Tầm Chân sử dụng các công nghệ “vật lý số” do công ty Phygital Labs phát triển nhằm lưu giữ, trưng bày, quảng bá và ứng dụng văn hóa truyền thống Việt Nam vào cuộc sống đương đại.",
    images: [
      "https://storage.googleapis.com/assets-fygito/tamchan-website/364783628_672502501582122_4401498292864211426_n%201.png",
    ],
    url: "https://tamchan.vn/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(lostTypeFont.variable, btBeausans.variable)}>
      <body>
        <FullScreen>
          <Header />
          <main>{children}</main>
          <section className="m-auto w-full snap-center snap-always">
            <Footer />
          </section>
        </FullScreen>
      </body>
    </html>
  );
}
