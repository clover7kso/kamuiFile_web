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

      <Stack spacing={2} sx={{ pt: 4 }} direction={isPc ? "row" : "column"}>
        <Stack sx={{ minWidth: 350 }}>
          <Sender />
        </Stack>
        <Stack sx={{ minWidth: 350 }}>
          <Receiver />
        </Stack>
      </Stack>
    </Stack>
  );
}
