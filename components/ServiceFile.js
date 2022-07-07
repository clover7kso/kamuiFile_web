import { Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { DESKTOP } from "../util/mediaQuery";
import ic_folder_open from "../public/ic_folder_open.png";
import Image from "next/image";

const ServiceFile = () => {
  const isPc = useMediaQuery(DESKTOP);

  const { t } = useTranslation("common");

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 3, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={2} sx={{ alignItems: "center", minWidth: 300 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Image
            width={89}
            height={89}
            objectFit="contain"
            alt="ic_folder_open"
            src={ic_folder_open}
          />
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("titleAboutFile")}
          </Typography>
          <Typography
            variant="body8"
            sx={{ color: "#aaaaaa", textAlign: "center" }}
          >
            {t("subtitleAboutFile")}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            {t("contentAboutFile")}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ServiceFile;
