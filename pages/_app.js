import { useEffect, useState } from "react";

import CategoriesContextProvider from "../store/categories-context";
import AuthContextProvider from "../store/auth-context";
import BasketContextProvider from "../store/basket-context";
import AddressContextProvider from "../store/address-context";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../components/UI/Theme/Theme";

import "../styles/globals.scss";
import "../styles/swiper.scss";
import Layout from "../components/Layout/Layout";
import { usePageLoading } from "../hooks/usePageLoading";
import Loading from "../components/UI/Loading/Loading";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function MyApp({ Component, pageProps }) {
  const isPageLoading = usePageLoading();

  return (
    <AuthContextProvider>
      <CategoriesContextProvider>
        <BasketContextProvider>
          <AddressContextProvider>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <Layout loading={isPageLoading}>
                  {isPageLoading ? <Loading /> : <Component {...pageProps} />}
                </Layout>
              </ThemeProvider>
            </CacheProvider>
          </AddressContextProvider>
        </BasketContextProvider>
      </CategoriesContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
