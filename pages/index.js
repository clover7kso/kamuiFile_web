import { AppBar, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import logo from "../public/logo.png";
import { NextSeo } from "next-seo";
import { seoDefault } from "../util/seo";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import { DESKTOP } from "../util/mediaQuery";

export default function Home() {
  const isPc = useMediaQuery(DESKTOP);
  return (
    <Stack
      sx={{
        p: 5,
        minWidth: "100vw",
        minHeight: "100vh",
        alignItems: "center",
        bgcolor: "#eceff5",
      }}
    >
      <NextSeo {...seoDefault} />

      <Stack spacing={2} sx={{ minWidth: 300, pt: 2 }}>
        <AppBar sx={{ bgcolor: "#ffffff" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Image
              width={60}
              height={60}
              objectFit="contain"
              alt="ic_folder_open"
              src={logo}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#000000",
                fontFamily: "Aldrich",
                fontSize: 40,
              }}
            >
              KAMUI FILE
            </Typography>
          </Stack>
        </AppBar>

        <Sender />
        <Receiver />
      </Stack>
    </Stack>
  );
}
