import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

import PageTransition from "../components/PageTransition";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Financial Solutions for a Better Tomorrow | PaisaDekho"
        description="Get expert financial solutions from PaisaDekho . Our team of experts provides personalized solutions to help you reach your financial goals. Get started today!"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: process.env.BASE_URL,
          siteName: "Paisadekho",
        }}
      />
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </>
  );
}

export default MyApp;
