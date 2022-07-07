import React, { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import { responsiveFontSizes } from "@mui/material/styles";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import createEmotionCache from "../util/createEmotionCache";
import "../styles/global.css";
import { useRouter } from "next/router";
import { pageview } from "../util/pageview";
import lightTheme from "../styles/theme/lightTheme";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import logo from "../public/logo.png";
import { DESKTOP } from "../util/mediaQuery";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { appWithTranslation, useTranslation } from "next-i18next";

const clientSideEmotionCache = createEmotionCache();
const theme = responsiveFontSizes(lightTheme);

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const isPc = useMediaQuery(DESKTOP);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const { t } = useTranslation("common");

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
      setHamburgerOpen(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const linkList = [
    { href: "/", name: t("TRANSFER") },
    { href: "/image", name: t("EDIT IMAGE") },
    { href: "/service", name: t("SERVICE") },
    //{ href: "/pdf", name: "EDIT PDF" },
  ];

  const footerList = [
    { href: "/about", name: "About" },
    { href: "/contact", name: "Contact" },
    { href: "/terms", name: "Terms and Conditions" },
    //{ href: "/pdf", name: "EDIT PDF" },
  ];

  return (
    <SnackbarProvider
      SnackbarProps={{
        autoHideDuration: 1000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      }}
    >
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AppBar sx={{ bgcolor: "#ffffff", px: 3, py: 1 }} elevation={1}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: !isPc && "space-between",
              }}
              spacing={12}
            >
              <Stack direction="row" spacing={1}>
                <Image
                  width={40}
                  height={40}
                  objectFit="contain"
                  alt="ic_folder_open"
                  src={logo}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: 32,
                    color: "#000000",
                    verticalAlign: "center",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  Kamui File
                </Typography>
              </Stack>

              {isPc ? (
                <Stack direction="row" spacing={6}>
                  {linkList.map((item, index) => {
                    return (
                      <Link href={item.href} key={index}>
                        <Typography
                          variant="body1"
                          sx={{
                            color:
                              item.href === router.pathname
                                ? "#00beff"
                                : "#444444",
                            verticalAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    );
                  })}
                </Stack>
              ) : (
                <Hamburger
                  toggled={isHamburgerOpen}
                  toggle={setHamburgerOpen}
                  color="#00beff"
                />
              )}
            </Stack>
          </AppBar>
          {!isPc && isHamburgerOpen && (
            <Stack
              sx={{
                pt: 12,
                position: "absolute",
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "#ffffffcc",
                zIndex: 1,
                alignItems: "center",
              }}
              spacing={2}
            >
              {linkList.map((item, index) => {
                return (
                  <Link href={item.href} key={index}>
                    <Typography
                      variant="h5"
                      sx={{
                        verticalAlign: "center",
                        color:
                          item.href === router.pathname ? "#00beff" : "#999999",
                        pointer: "cursor",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                );
              })}
            </Stack>
          )}

          <Stack
            sx={{
              bgcolor: "#eceff5",
              height: "100vh",
              justifyContent: "space-between",
            }}
          >
            <Component {...pageProps} />

            <Stack sx={{ bgcolor: "#eceff5", p: 2 }}>
              <Stack direction="row">
                {footerList.map((item, index) => (
                  <Stack direction="row">
                    <Link href={item.href}>
                      <Typography
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          fontWeight:
                            item.href === router.pathname ? "bold" : "none",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                    <Typography
                      variant="body2"
                      sx={{
                        mx: 1,
                        fontWeight:
                          item.href === router.pathname ? "bold" : "none",
                        pointer: "cursor",
                      }}
                    >
                      {index !== footerList.length - 1 && " | "}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Typography variant="body2">
                © 2021. Woon. all rights reserved.
              </Typography>
            </Stack>
          </Stack>
        </ThemeProvider>
      </CacheProvider>
    </SnackbarProvider>
  );
};

export default appWithTranslation(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
