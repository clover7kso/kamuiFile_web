import { Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { DESKTOP } from "../util/mediaQuery";
import ic_image_open from "../public/ic_image_open.png";
import Image from "next/image";

const ServiceImage = () => {
  const isPc = useMediaQuery(DESKTOP);

  const { t } = useTranslation("common");

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 2, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={2} sx={{ alignItems: "center", minWidth: 300 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Image
            width={100}
            height={100}
            objectFit="contain"
            alt="ic_image_open"
            src={ic_image_open}
          />
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("titleAboutImage")}
          </Typography>
          <Typography
            variant="body8"
            sx={{ color: "#aaaaaa", textAlign: "center" }}
          >
            {t("subtitleAboutImage")}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            {t("contentAboutImage")}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ServiceImage;
