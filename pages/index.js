import { Stack, useMediaQuery } from "@mui/material";
import { NextSeo } from "next-seo";
import { metaGen } from "../util/seo";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import { DESKTOP } from "../util/mediaQuery";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function File() {
  const isPc = useMediaQuery(DESKTOP);
  const { t } = useTranslation("seo_file");
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "seo_file"])),
  },
});
