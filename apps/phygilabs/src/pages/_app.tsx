import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import { gaApiKey } from "@/constant";
import HeadMetaTag from "@/components/common/HeaderMetaTag";

import localFont from "next/font/local";

const spaceGroteskFont = localFont({
  src: [
    {
      path: "../assets/fonts/space-grotesk/SpaceGrotesk-Light.ttf",
      weight: "300",
    },
    {
      path: "../assets/fonts/space-grotesk/SpaceGrotesk-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/space-grotesk/SpaceGrotesk-Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/space-grotesk/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../assets/fonts/space-grotesk/SpaceGrotesk-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-spaceGrotesk",
});

const muiTheme = createTheme({
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${spaceGroteskFont.style.fontFamily};
        }
      `}</style>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script
        id="GA"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaApiKey}', {
            page_path: window.location.pathname,
            });`,
        }}
      ></Script>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"
      />
      <MuiThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <HeadMetaTag
            title="Phygital - Thực số song hành"
            description="Giải pháp số hoá và chuyển đổi số"
            image="https://assets.nomion.io/phygilab-website/shared-phygilabs-thumbnail.webp"
          />
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </QueryClientProvider>
      </MuiThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
