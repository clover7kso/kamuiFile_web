import { Stack, Typography, useMediaQuery } from "@mui/material";
import { NextSeo } from "next-seo";
import { seoDefault } from "../../util/seo";
import { DESKTOP } from "../../util/mediaQuery";
import Compress from "../../components/Compress";

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
        <Typography>pdf</Typography>
      </Stack>
    </Stack>
  );
}
