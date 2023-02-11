import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import PageTransition from "../components/PageTransition";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </UserProvider>
  );
}

export default MyApp;
