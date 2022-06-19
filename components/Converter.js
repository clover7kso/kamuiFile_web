import {
  Button,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Progress from "./Progress";
import useTranslation from "next-translate/useTranslation";
import { DESKTOP } from "../util/mediaQuery";
import DropZone from "./DropZone";
import fileDownload from "js-file-download";

const Converter = () => {
  const isPc = useMediaQuery(DESKTOP);

  const [files, setFiles] = useState({ files: [] });
  const [fileInfo, setFileInfo] = useState({ infos: [] });
  const [type, setType] = useState("jpeg");
  const [convertStart, setConvertStart] = useState(false);
  let { t } = useTranslation("");

  const convertImage = function (file, type, index) {
    let reader = new FileReader();
    reader.onloadend = async () => {
      let orig_src = new Image();
      orig_src.src = reader.result;
      let resize_canvas = document.createElement("canvas");
      resize_canvas.width = orig_src.width;
      resize_canvas.height = orig_src.height;
      resize_canvas
        .getContext("2d")
        .drawImage(orig_src, 0, 0, orig_src.width, orig_src.height);

      resize_canvas.toBlob((blob) => {
        setFiles((prev) => {
          let newArray = prev.files;
          newArray[index] = blob;
          console.log(newArray[index]);
          return { files: newArray };
        });
        setFileInfo((prev) => {
          let newArray = prev.infos;
          let newName = newArray[index].name
            .replace(".jpg", "." + type)
            .replace(".jpeg", "." + type)
            .replace(".png", "." + type)
            .replace(".gif", "." + type)
            .replace(".webp", "." + type)
            .replace(".svg", "." + type)
            .replace(".ico", "." + type)
            .replace(".bmp", "." + type);
          newArray[index] = {
            ...newArray[index],
            name: newName,
            progress: 100.0,
          };
          return { infos: newArray };
        });
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 5, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={2} sx={{ alignItems: "center", minWidth: 300 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("common:titleConverter")}
          </Typography>
          <Typography
            variant="body8"
            sx={{ color: "#aaaaaa", textAlign: "center" }}
          >
            {t("common:subtitleConverter")}
          </Typography>
        </Stack>

        {fileInfo.infos.length === 0 && (
          <DropZone
            icon="converter"
            accept={{
              "image/jpeg": [
                ".jpeg",
                ".jpg",
                ".png",
                ".webp",
                ".bmp",
                ".svg",
                ".ico",
              ],
              "image/png": [
                ".jpeg",
                ".jpg",
                ".png",
                ".webp",
                ".bmp",
                ".svg",
                ".ico",
              ],
            }}
            onChange={async (dropFiles) => {
              setFiles({ files: dropFiles });
              setFileInfo({
                infos: dropFiles.map((item) => {
                  return {
                    name: item.name,
                    type: "." + item.name.split(".").pop(),
                    progress: 0,
                  };
                }),
              });
              dropFiles.map((item, index) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                  setFileInfo((prev) => {
                    let newArray = prev.infos;
                    newArray[index] = {
                      ...newArray[index],
                      preview: reader.result,
                    };
                    return { infos: newArray };
                  });
                };
                reader.readAsDataURL(item);
              });
            }}
          />
        )}

        {fileInfo.infos.length !== 0 && (
          <Stack
            sx={{
              width: "100%",
            }}
          >
            <Stack spacing={1.5}>
              <ToggleButtonGroup
                disabled={convertStart}
                exclusive
                color="primary"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
              >
                <ToggleButton value={"jpeg"}>jpeg</ToggleButton>
                <ToggleButton value={"png"}>png</ToggleButton>
                <ToggleButton value={"gif"}>gif</ToggleButton>
                <ToggleButton value={"webp"}>webp</ToggleButton>
              </ToggleButtonGroup>

              {fileInfo.infos.map((item, index) => {
                return (
                  <Stack
                    key={index}
                    direction="row"
                    spacing={2}
                    bgcolo="primary.main"
                  >
                    {item.preview && (
                      <img
                        src={item.preview}
                        width={50}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                    )}

                    <Stack
                      spacing={1}
                      flex={1}
                      sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <Typography variant="body2" noWrap>
                        {item.progress}%
                      </Typography>
                      <Progress percentage={item.progress} />
                      <Stack direction="row">
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            maxWidth: 150,
                          }}
                        >
                          {item.name}
                        </Typography>

                        {item.progress === 100.0 && (
                          <Button
                            sx={{ p: 0, ml: 1 }}
                            onClick={() => {
                              fileDownload(
                                files.files[index],
                                fileInfo.infos[index].name
                              );
                            }}
                          >
                            <Typography
                              variant="body2"
                              noWrap
                              sx={{
                                maxWidth: 200,
                              }}
                            >
                              {t("common:download")}
                            </Typography>
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        )}
        {fileInfo.infos.length !== 0 &&
          fileInfo.infos.filter((item) => item.progress === 100.0).length !==
            fileInfo.infos.length && (
            <Button
              variant="contained"
              component="span"
              sx={{ color: "#ffffff", width: "100%" }}
              onClick={() => {
                files.files.map(async (file, i) => {
                  setConvertStart(true);
                  convertImage(file, type, i);
                });
              }}
            >
              {t("common:titleConverter")}
            </Button>
          )}
        {fileInfo.infos.length !== 0 &&
        fileInfo.infos.filter((item) => item.progress === 100.0).length ===
          fileInfo.infos.length ? (
          <Button
            variant="contained"
            component="span"
            sx={{ color: "#ffffff", width: "100%" }}
            onClick={() => {
              setConvertStart(false);
              setFileInfo({ infos: [] });
            }}
          >
            {t("common:done")}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default Converter;
