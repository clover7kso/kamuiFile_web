import { Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { DESKTOP } from "../util/mediaQuery";
import ic_woony from "../public/ic_woony.jpeg";
import Image from "next/image";

const AboutMe = () => {
  const isPc = useMediaQuery(DESKTOP);

  const { t } = useTranslation("common");

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 3, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={2} sx={{ alignItems: "center", minWidth: 300 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Image
            style={{ borderRadius: 20 }}
            width={89}
            height={89}
            objectFit="contain"
            alt="ic_woony"
            src={ic_woony}
          />
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("titleAboutMe")}
          </Typography>
          <Typography
            variant="body8"
            sx={{ color: "#aaaaaa", textAlign: "center" }}
          >
            {t("subtitleAboutMe")}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            {t("contentAboutMe")}
          </Typography>

          <Stack sx={{ width: "100%" }}>
            <Typography variant="body2" sx={{ mt: 2, color: "#aaaaaa" }}>
              E-mail : kamuifile@gmail.com
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AboutMe;
