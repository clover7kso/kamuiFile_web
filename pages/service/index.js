import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import ServiceFile from "../../components/ServiceFile";
import ServiceImage from "../../components/ServiceImage";
import { DESKTOP } from "../../util/mediaQuery";
import { metaGen } from "../../util/seo";

export default function Service() {
  const isPc = useMediaQuery(DESKTOP);
  const { t } = useTranslation("seo_service");

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
          <ServiceFile />
        </Stack>
        <Stack sx={{ maxWidth: 350 }}>
          <ServiceImage />
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
