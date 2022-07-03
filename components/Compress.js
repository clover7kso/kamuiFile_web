import { Button, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Progress from "./Progress";
import { useTranslation } from "next-i18next";
import { DESKTOP } from "../util/mediaQuery";
import DropZone from "./DropZone";
import imageCompression from "browser-image-compression";
import fileDownload from "js-file-download";
import bytesToSize from "../util/bytesToSize";

const Compress = () => {
  const isPc = useMediaQuery(DESKTOP);

  const [files, setFiles] = useState({ files: [] });
  const [fileInfo, setFileInfo] = useState({ infos: [] });
  const { t } = useTranslation("common");

  const compress = async () => {
    files.files.map(async (file, i) => {
      const options = {
        useWebWorker: true,
        alwaysKeepResolution: true,
        initialQuality: 0.3,
        onProgress: (progress) => {
          setFileInfo((prev) => {
            let newArray = prev.infos;
            newArray[i] = { ...newArray[i], progress: progress.toFixed(1) };
            return { infos: newArray };
          });
        },
      };

      //console.log("originalFile instanceof Blob", file instanceof Blob); // true
      //console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

      try {
        const compressedFile = await imageCompression(file, options);
        //console.log(
        //  "compressedFile instanceof Blob",
        //  compressedFile instanceof Blob
        //); // true
        //console.log(
        //  `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        //); // smaller than maxSizeMB

        setFileInfo((prev) => {
          let newArray = prev.infos;
          newArray[i] = {
            ...newArray[i],
            compressSize: compressedFile.size,
          };
          return { infos: newArray };
        });

        setFiles((prev) => {
          let newArray = prev.files;
          newArray[i] = compressedFile;
          return { files: newArray };
        });
        //fileDownload(compressedFile, compressedFile.name);
        // write your own logic
      } catch (error) {
        //console.log(error);
      }
    });
  };

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 5, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={2} sx={{ alignItems: "center", minWidth: 300 }}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("titleCompress")}
          </Typography>
          <Typography
            variant="body8"
            sx={{ color: "#aaaaaa", textAlign: "center" }}
          >
            {t("subtitleCompress")}
          </Typography>
        </Stack>

        {fileInfo.infos.length === 0 && (
          <DropZone
            icon="compress"
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
                    fileSize: item.size,
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
                        {bytesToSize(item.fileSize)} {"  "}
                        {item.compressSize &&
                          " -> " + bytesToSize(item.compressSize) + "  "}
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

                        {item.progress === "100.0" && (
                          <Button
                            sx={{ p: 0, ml: 1 }}
                            onClick={() => {
                              fileDownload(
                                files.files[index],
                                files.files[index].name
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
          fileInfo.infos.filter((item) => item.progress === "100.0").length !==
            fileInfo.infos.length && (
            <Button
              variant="contained"
              component="span"
              sx={{ color: "#ffffff", width: "100%" }}
              onClick={() => {
                compress();
              }}
            >
              {t("titleCompress")}
            </Button>
          )}
        {fileInfo.infos.length !== 0 &&
        fileInfo.infos.filter((item) => item.progress === "100.0").length ===
          fileInfo.infos.length ? (
          <Button
            variant="contained"
            component="span"
            sx={{ color: "#ffffff", width: "100%" }}
            onClick={() => {
              setFileInfo({ infos: [] });
            }}
          >
            {t("done")}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default Compress;
