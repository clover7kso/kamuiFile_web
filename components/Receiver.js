import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import fileDownload from "js-file-download";
import ICFile from "../public/ic_file.svg";
import { Box } from "@mui/system";
import Progress from "../components/Progress";
import { useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import SimplePeerFiles from "simple-peer-files";
import bytesToSize from "../util/bytesToSize";

const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:4000"
    : "wss://kamuifile.com";
const PATH_URL = process.env.NODE_ENV === "development" ? "" : "/backend";

const Receiver = () => {
  const [loading, setLoading] = useState(false);

  const [joinRoomID, setJoinRoomID] = useState("");
  const regex = /\d{6}/;

  const [refresh, setRefresh] = useState(false);

  const recvFileInfo = useRef();
  const socketRecv = useRef();
  const recvPeer = useRef();
  const { t } = useTranslation("common");

  const ioJoin = () => {
    socketRecv.current = io.connect(SOCKET_URL, { path: PATH_URL });

    socketRecv.current.on("all users", (user) => {
      //console.log("create user");
      recvPeer.current = createPeer(user, socketRecv.current.id);
    });

    socketRecv.current.on("receiving returned signal", (payload) => {
      //console.log("receiving returned signal");
      //console.log(payload);
      //console.log(payload.signal);
      //console.log(recvPeer);
      recvPeer.current.signal(payload.signal);
      setLoading(false);
    });

    socketRecv.current.on("room full", () => {
      //console.log("room full");
      alert("room is full");
    });

    socketRecv.current.on("cant find room", (user) => {
      setLoading(false);
    });
  };

  function createPeer(userToSignal, callerID) {
    //console.log("createPeer");
    const peer = new Peer({
      initiator: true,
      trickle: false,
    });

    peer.on("signal", (signal) => {
      //console.log("signal");
      socketRecv.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    peer.on("connect", () => {
      socketRecv.current.disconnect();
      //console.log("connected");
      peer.on("data", (fileInfo) => {
        let recvFile = new TextDecoder("utf-8").decode(fileInfo);
        recvFile = JSON.parse(recvFile);
        ////console.log(recvFile.fileInfo);
        if (recvFile.fileInfo) {
          recvFileInfo.current = recvFile.fileInfo;
          setRefresh((prev) => !prev);

          const spf = new SimplePeerFiles();
          for (var i = 0; i < recvFileInfo.current.length; i++) {
            // peer is the SimplePeer object connection to sender
            ////console.log(i);
            spf.receive(recvPeer.current, i.toString()).then((transfer) => {
              transfer.on("progress", (sentBytes) => {
                if (sentBytes === 100) return;
                let newArray = recvFileInfo.current;
                newArray[i] = {
                  ...newArray[i],
                  progress: sentBytes.toFixed(1),
                  progressSize: newArray[i].fileSize * (sentBytes / 100),
                };
                recvFileInfo.current = [...newArray];
                setRefresh((prev) => !prev);
              });
              transfer.on("done", async (file) => {
                //console.log("Done");
                if (file) {
                  let newArray = recvFileInfo.current;
                  newArray[i] = {
                    ...newArray[i],
                    file: await file,
                    progress: 100,
                    progressSize: newArray[i].fileSize,
                  };
                  recvFileInfo.current = [...newArray];
                  setRefresh((prev) => !prev);
                }
              });
            });
          }
          recvPeer.current.send("heySenderYouCanSendNow");
        }
      });
    });

    return peer;
  }

  return (
    <Paper sx={{ pl: 3, pr: 3, pt: 5, pb: 5, borderRadius: 2 }} elevation={1}>
      <Stack spacing={3}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h5" sx={{ color: "#444444" }}>
            {t("titleRecv")}
          </Typography>
          <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
            {t("subtitleRecv")}
          </Typography>
        </Stack>
        {!recvFileInfo.current ? (
          <Stack spacing={3}>
            <TextField
              id="outlined-basic"
              label={t("hintRecv")}
              variant="outlined"
              type="number"
              onChange={(e) => setJoinRoomID(e.target.value)}
              error={joinRoomID !== "" && !regex.test(joinRoomID)}
              helperText={
                joinRoomID !== "" && !regex.test(joinRoomID)
                  ? t("hintRecv")
                  : ""
              }
            />
            <Button
              disabled={loading}
              variant="contained"
              component="span"
              sx={{ width: "100%", height: 40, color: "#ffffff" }}
              onClick={() => {
                if (!regex.test(joinRoomID)) return;
                setLoading(true);
                ioJoin();
                socketRecv.current.emit("join room", joinRoomID);
              }}
            >
              {loading ? (
                <CircularProgress color="WHITE" size={22} />
              ) : (
                t("btnRecv")
              )}
            </Button>
          </Stack>
        ) : (
          <Stack spacing={1.5}>
            {recvFileInfo.current.map((item, index) => {
              return (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  bgcolo="primary.main"
                >
                  <Box style={{ position: "relative" }}>
                    <ICFile width={50} height={60} />
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: 14,
                        left: 6,
                        fontSize: 14,
                        color: "white",
                      }}
                    >
                      {item.type}
                    </Typography>
                  </Box>
                  <Stack
                    spacing={1}
                    flex={1}
                    sx={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      maxWidth: 230,
                    }}
                  >
                    <Typography variant="body2" noWrap>
                      {bytesToSize(item.progressSize) +
                        "/" +
                        bytesToSize(item.fileSize)}{" "}
                      {item.progress}%
                    </Typography>
                    <Progress percentage={item.progress} />
                    <Stack direction="row">
                      <Typography
                        variant="body2"
                        noWrap
                        sx={{
                          maxWidth: 140,
                        }}
                      >
                        {item.name}
                      </Typography>
                      {item.file ? (
                        <Button
                          sx={{ p: 0, ml: 1 }}
                          onClick={() => fileDownload(item.file, item.name)}
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
                      ) : undefined}
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
            {recvFileInfo.current.find(
              (item) => item.progress !== 100
            ) ? null : (
              <Button
                required
                variant="contained"
                component="span"
                sx={{ width: "100%", color: "#ffffff" }}
                onClick={() => {
                  recvFileInfo.current = undefined;
                  setRefresh((prev) => !prev);
                }}
              >
                {t("done")}
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default Receiver;
