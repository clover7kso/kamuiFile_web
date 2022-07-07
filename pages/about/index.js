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
  const { t } = useTranslation("seo_service");
  const common = useTranslation("common");

  return (
    <Stack
      sx={{
        pt: 5,
        px: isPc ? 5 : 3,
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

      <Stack spacing={2} sx={{ pt: 4 }}>
        <Stack
          sx={{ maxWidth: 1024, px: isPc && 2, py: 4, alignItems: "center" }}
        >
          <div>
            <Image
              style={{ borderRadius: 60 }}
              width={120}
              height={120}
              objectFit="contain"
              alt="ic_woony"
              src={ic_woony}
            />
          </div>
          <Typography
            variant="h3"
            sx={{ color: "#444444", my: 3, textAlign: "center" }}
          >
            {common.t("titleAboutMe")}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            {common.t("contentAboutMe")}
          </Typography>

          <Typography variant="h5" sx={{ my: 3, textAlign: "center" }}>
            {common.t("subtitleAboutMe")}
          </Typography>

          <Typography variant="body2">E-mail : clover7kso@gmail.com</Typography>
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
