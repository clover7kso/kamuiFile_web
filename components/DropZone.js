import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import ic_folder_open from "../public/ic_folder_open.png";
import ic_folder_close from "../public/ic_folder_close.png";
import { motion } from "framer-motion";
import Timer from "./Timer";

const Dropzone = ({ onChange, senderRoomID, connect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [isOn, setIsOn] = useState(false);
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
            width={80}
            height={80}
            src={isOn || isDragActive ? ic_folder_open : ic_folder_close}
            objectFit="contain"
            alt="ic_folder_open"
          />
        </motion.div>
        <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
          {isDragActive ? "Drop it!!" : "Drag & Drop your files here"}
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
        {!connect ? (
          <Timer />
        ) : (
          <Typography variant="h5" sx={{ color: "#000000" }}>
            Success Connect!
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Dropzone;
