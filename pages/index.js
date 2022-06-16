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

      <Stack spacing={2} sx={{ minWidth: 300, pt: 4 }}>
        <AppBar sx={{ bgcolor: "#ffffff", px: 2, py: 1 }} elevation={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image
              width={40}
              height={40}
              objectFit="contain"
              alt="ic_folder_open"
              src={logo}
            />
            <Typography
              variant={isPc ? "h4" : "h6"}
              sx={{
                color: "#444444",
                fontSize: 32,
                verticalAlign: "center",
              }}
            >
              Kamui File
            </Typography>
          </Stack>
        </AppBar>

        <Sender />
        <Receiver />
      </Stack>
    </Stack>
  );
}
