import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ic_folder_open from "../public/ic_folder_open.png";
import ic_folder_close from "../public/ic_folder_close.png";
import { motion } from "framer-motion";
import Timer from "./Timer";
import useTranslation from "next-translate/useTranslation";

const Dropzone = ({ onChange, senderRoomID, connect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [isOn, setIsOn] = useState(false);
  let { t } = useTranslation("");

  return !senderRoomID ? (
    <Box
      sx={{
        backgroundColor: "#eceff566",
        borderRadius: 5,
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
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={2}
        >
          {senderRoomID.split("").map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: "#eceff566",
                pl: 1,
                pr: 1,
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
        {!connect ? <Timer /> : undefined}
      </Stack>
    </Box>
  );
};

export default Dropzone;
