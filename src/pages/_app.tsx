import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import type { AppProps } from "next/app";
import { Providers } from "@/components/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
