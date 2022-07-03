import {
  Button,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import Progress from "./Progress";
import { useTranslation } from "next-i18next";
import { DESKTOP } from "../util/mediaQuery";
import DropZone from "./DropZone";
import fileDownload from "js-file-download";

const Resize = () => {
  const isPc = useMediaQuery(DESKTOP);

  const [files, setFiles] = useState({ files: [] });
  const [fileInfo, setFileInfo] = useState({ infos: [] });
  const [resize, setResize] = useState(25);
  useEffect(() => {
    setFileInfo((prev) => {
      let newArray = prev.infos;
      return {
        infos: newArray.map((item, index) => {
          return {
            ...item,
            resizeWidth: Math.floor(item.orgWidth * ((100 - resize) / 100)),
            resizeHeight: Math.floor(item.orgHeight * ((100 - resize) / 100)),
          };
        }),
      };
    });
  }, [resize]);
  const [resizeStart, setResizeStart] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { t } = useTranslation("common");

  const resizeImage = function (file, factor, index) {
    let reader = new FileReader();
    reader.onloadend = async () => {
      let orig_src = new Image();
      orig_src.src = reader.result;
      let resize_canvas = document.createElement("canvas");
      //console.log(orig_src.width);
      //console.log((100 - factor) / 100);
      //console.log(orig_src.width * ((100 - factor) / 100));
      resize_canvas.width = orig_src.width * ((100 - factor) / 100);
      resize_canvas.height = orig_src.height * ((100 - factor) / 100);
      resize_canvas
        .getContext("2d")
        .drawImage(
          orig_src,
          0,
          0,
          orig_src.width * ((100 - factor) / 100),
          orig_src.height * ((100 - factor) / 100)
        );

      resize_canvas.toBlob(
        (blob) => {
          setFiles((prev) => {
            let newArray = prev.files;
            newArray[index] = blob;
            return { files: newArray };
          });
          setFileInfo((prev) => {
            let newArray = prev.infos;
            newArray[index] = { ...newArray[index], progress: 100.0 };
            return { infos: newArray };
          });
        },
        file.name.includes(".png") ? "image/png" : "image/jpeg",
        0.7
      );
    };
    reader.readAsDataURL(file);
  };

  const compress = async () => {
    setResizeStart(true);
    files.files.map(async (file, i) => {
      resizeImage(file, resize, i);
    });
  };

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 5, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={2} sx={{ alignItems: "center", minWidth: 300 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("titleResize")}
          </Typography>
          <Typography
            variant="body8"
            sx={{ color: "#aaaaaa", textAlign: "center" }}
          >
            {t("subtitleResize")}
          </Typography>
        </Stack>

        {fileInfo.infos.length === 0 && (
          <DropZone
            icon="resize"
            accept={{
              "image/jpeg": [".jpeg", ".jpg", ".png", ".webp", ".bmp"],
              "image/png": [".jpeg", ".jpg", ".png", ".webp", ".bmp"],
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
                reader.onloadend = async () => {
                  let orig_src = new Image();
                  orig_src.src = reader.result;
                  setFileInfo((prev) => {
                    let newArray = prev.infos;
                    newArray[index] = {
                      ...newArray[index],
                      preview: reader.result,
                      orgWidth: orig_src.width,
                      orgHeight: orig_src.height,
                      resizeWidth: orig_src.width * ((100 - resize) / 100),
                      resizeHeight: orig_src.height * ((100 - resize) / 100),
                    };
                    return { infos: newArray };
                  });
                };
                reader.readAsDataURL(item);
              });
              setRefresh((prev) => !prev);
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
                disabled={resizeStart}
                exclusive
                color="primary"
                value={resize}
                onChange={(e) => {
                  setResize(parseInt(e.target.value));
                }}
                fullWidth
              >
                <ToggleButton value={25}>25%</ToggleButton>
                <ToggleButton value={50}>50%</ToggleButton>
                <ToggleButton value={75}>75%</ToggleButton>
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
                        {item.orgWidth}x{item.orgHeight}
                        {" -> "} {item.resizeWidth}x{item.resizeHeight}{" "}
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
                              {t("download")}
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
                compress();
              }}
            >
              {t("titleResize")}
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
              setFileInfo({ infos: [] });
              setResizeStart(false);
            }}
          >
            {t("done")}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default Resize;
