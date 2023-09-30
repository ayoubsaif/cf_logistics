import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "@/styles/theme";
import "@/styles/globals.css";
import '@/styles/fonts.css';
import { getSiteConfig } from "@/services/siteConfig";
import { QueryClient, QueryClientProvider } from 'react-query'

import NextProgress from "next-progress";
const queryClient = new QueryClient()
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const brandColor = theme?.colors?.brand[300];
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <NextProgress options={{ showSpinner: false }} color={brandColor} />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

// get static props with page info from backend
App.getInitialProps = async () => {
  try {
    const siteConfig = await getSiteConfig();
    return {
      pageProps: {
        siteConfig,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      pageProps: {
        siteConfig: {},
      },
    };
  }
}