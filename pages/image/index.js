import { Stack, useMediaQuery } from "@mui/material";
import { NextSeo } from "next-seo";
import { metaGen } from "../../util/seo";
import { DESKTOP } from "../../util/mediaQuery";
import Compress from "../../components/Compress";
import Resize from "../../components/Resize";
import Converter from "../../components/Converter";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function Image() {
  const isPc = useMediaQuery(DESKTOP);
  const { t } = useTranslation("seo_image");

  return (
    <Stack
      sx={{
        p: 5,
        minWidth: "100vw",
        alignItems: "center",
        bgcolor: "#eceff5",
      }}
    >
      <NextSeo
        {...metaGen({
          title: t("title"),
          description: t("description"),
          url: t("url"),
        })}
      />
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

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "seo_image"])),
    },
  };
};
