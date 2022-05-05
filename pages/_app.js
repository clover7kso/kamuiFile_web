import React from "react";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "../util/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/global.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
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
