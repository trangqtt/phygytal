/* eslint-disable */
import Layout from "@/components/common/Layout";
import { gaApiKey } from "@/constant";
import muiTheme from "@/styles/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/globals.css";
import localFont from "next/font/local";
import { AppStep } from "@/hooks/useAppStepContext";
import { store } from "@/redux/store";

const svnPoppinsFont = localFont({
  src: [
    {
      path: "../assets/fonts/svn-poppins/SVN-Poppins-Light.ttf",
      weight: "300",
    },
    {
      path: "../assets/fonts/svn-poppins/SVN-Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/svn-poppins/SVN-Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/svn-poppins/SVN-Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../assets/fonts/svn-poppins/SVN-Poppins-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-svnPoppins",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 3000,
      staleTime: 1000 * 20,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${svnPoppinsFont.style.fontFamily};
        }
      `}</style>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"
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
      <MuiThemeProvider theme={muiTheme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <AppStep>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AppStep>
            <ToastContainer
              position="top-right"
              autoClose={3000}
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
        </Provider>
      </MuiThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
