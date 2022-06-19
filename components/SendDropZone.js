import { Alert, Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ic_folder_open from "../public/ic_folder_open.png";
import ic_folder_close from "../public/ic_folder_close.png";
import { motion } from "framer-motion";
import Timer from "./Timer";
import useTranslation from "next-translate/useTranslation";
import { useSnackbar } from "material-ui-snackbar-provider";

const SendDropZone = ({ onChange, senderRoomID, connect, onTimerDone }) => {
  const snackbar = useSnackbar();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [isOn, setIsOn] = useState(false);
  let { t } = useTranslation("");

  const copyToClipboard = (content) => {
    const el = document.createElement("textarea");
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return !senderRoomID ? (
    <Box
      sx={{
        backgroundColor: "#eceff566",
        borderRadius: 1,
        border: "1px dashed grey",
        "&:hover": {
          backgroundColor: "#eceff5",
          opacity: 1,
        },
        cursor: "pointer",
      }}
      onMouseOver={() => setIsOn(true)}
      onMouseOut={() => setIsOn(false)}
      {...getRootProps()}
    >
      <Stack
        sx={{
          width: 300,
          height: 150,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ scale: isOn || isDragActive ? 1.1 : 1 }}
          transition={{ type: "spring", duration: 0.01, stiffness: 800 }}
        >
          <Image
            width={100}
            height={100}
            objectFit="contain"
            alt="ic_folder_open"
            src={isOn || isDragActive ? ic_folder_open : ic_folder_close}
          />
        </motion.div>
        <Typography variant="body8" sx={{ color: "#aaaaaa", mt: -1 }}>
          {isDragActive ? t("common:dropZoneSend") : t("common:dropZoneSend")}
        </Typography>
      </Stack>
    </Box>
  ) : (
    <Box>
      <Stack
        sx={{
          width: 300,
          alignItems: "center",
        }}
        spacing={2}
      >
        {connect && <Timer onTimerDone={onTimerDone} />}
        {connect && (
          <Stack
            direction="row"
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              snackbar.showMessage(`${t("common:copy")}`);
              copyToClipboard(senderRoomID);
            }}
          >
            {senderRoomID.split("").map((item, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: "#eceff566",
                  pl: 1.4,
                  pr: 1.4,
                  pt: 1.2,
                  pb: 1.2,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h5" sx={{ color: "#000000" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default SendDropZone;
