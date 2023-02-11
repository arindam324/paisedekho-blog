import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0/client";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
