import { Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import AboutFile from "../../components/AboutFile";
import AboutImage from "../../components/AboutImage";
import AboutMe from "../../components/AboutMe";
import { DESKTOP } from "../../util/mediaQuery";
import { metaGen } from "../../util/seo";

export default function About() {
  const isPc = useMediaQuery(DESKTOP);
  const { t } = useTranslation("seo_about");

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
      <NextSeo
        {...metaGen({
          title: t("title"),
          description: t("description"),
          url: t("url"),
        })}
      />
      <Stack spacing={2} sx={{ pt: 4 }} direction={isPc ? "row" : "column"}>
        <Stack sx={{ maxWidth: 350 }}>
          <AboutMe />
        </Stack>
        <Stack sx={{ maxWidth: 350 }}>
          <AboutFile />
        </Stack>
        <Stack sx={{ maxWidth: 350 }}>
          <AboutImage />
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
