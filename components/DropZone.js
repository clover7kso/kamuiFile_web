import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ic_image_open from "../public/ic_image_open.png";
import ic_image_close from "../public/ic_image_close.png";
import { motion } from "framer-motion";
import useTranslation from "next-translate/useTranslation";

const DropZone = ({ onChange, accept }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  });

  const [isOn, setIsOn] = useState(false);
  let { t } = useTranslation("");

  return (
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
            alt="ic_image_open"
            src={isOn || isDragActive ? ic_image_open : ic_image_close}
          />
        </motion.div>
        <Typography variant="body8" sx={{ color: "#aaaaaa", mt: -1 }}>
          {isDragActive ? t("common:dropZoneSend") : t("common:dropZoneSend")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default DropZone;
