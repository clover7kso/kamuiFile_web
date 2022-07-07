import { Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { DESKTOP } from "../../util/mediaQuery";
import { metaGen } from "../../util/seo";
import ic_woony from "../../public/ic_woony.jpeg";

export default function About() {
  const isPc = useMediaQuery(DESKTOP);
  const { t } = useTranslation("seo_about");
  const common = useTranslation("common");

  return (
    <Stack
      sx={{
        pt: 5,
        px: isPc ? 5 : 3,
        minWidth: "100vw",
        bgcolor: "#eceff5",
        alignItems: "center",
      }}
    >
      <NextSeo
        {...metaGen({
          title: t("title"),
          description: t("description"),
          url: t("url"),
        })}
      />
      <Stack spacing={2} sx={{ pt: isPc && 4 }}>
        <Stack sx={{ maxWidth: 1024, px: isPc && 2, py: 4 }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            {common.t("titleContactAd")}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            kamuifile@gmail.com
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {common.t("contentContactAd")}
          </Typography>

          <Typography variant="h4" sx={{ my: 3 }}>
            {common.t("titleContactBug")}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            kamuifile@gmail.com
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {common.t("contentContactBug")}
          </Typography>

          <Typography variant="h4" sx={{ my: 3 }}>
            {common.t("titleContactMe")}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            clover7kso@gmail.com
          </Typography>
          <Typography variant="body2">
            {common.t("contentContactMe")}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "seo_about"])),
    },
  };
};
