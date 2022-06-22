import { Stack, useMediaQuery } from "@mui/material";
import { NextSeo } from "next-seo";
import { seoDefault, seoImage } from "../../util/seo";
import { DESKTOP } from "../../util/mediaQuery";
import Compress from "../../components/Compress";
import Resize from "../../components/Resize";
import Converter from "../../components/Converter";

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
      <NextSeo {...seoImage} />

      <Stack spacing={2} sx={{ pt: 4 }} direction={isPc ? "row" : "column"}>
        <Stack sx={{ maxWidth: 350 }}>
          <Compress />
        </Stack>
        <Stack sx={{ maxWidth: 350 }}>
          <Resize />
        </Stack>
        <Stack sx={{ maxWidth: 350 }}>
          <Converter />
        </Stack>
      </Stack>
    </Stack>
  );
}
