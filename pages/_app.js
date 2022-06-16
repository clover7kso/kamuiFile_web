import React, { useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider, CssBaseline } from "@mui/material/";
import createEmotionCache from "../util/createEmotionCache";
import "../styles/global.css";
import { useRouter } from "next/router";
import { pageview } from "../util/pageview";
import lightTheme from "../styles/theme/lightTheme";

const clientSideEmotionCache = createEmotionCache();
const theme = responsiveFontSizes(lightTheme);

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
