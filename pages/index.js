import {
  AppBar,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import SimplePeerFiles from "simple-peer-files";
import fileDownload from "js-file-download";
import Dropzone from "../components/DropZone";
import ICFile from "../public/ic_file.svg";
import { Box } from "@mui/system";
import Progress from "../components/Progress";
import Head from "next/head";
import logo from "../public/logo.png";
import ogtag from "../public/ogtag.png";
import useTranslation from "next-translate/useTranslation";
import { NextSeo } from "next-seo";
import { seoDefault } from "../util/seo";

const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:4000"
    : "wss://kamuifile.com";
const PATH_URL = process.env.NODE_ENV === "development" ? "" : "/backend";

export default function Home() {
  const [connect, setConnect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const [senderRoomID, setSenderRoomID] = useState("");
  const [joinRoomID, setJoinRoomID] = useState("");
  const regex = /\d{6}/;

  const [refresh, setRefresh] = useState(false);

  const file = useRef();
  const fileInfo = useRef();
  const recvFileInfo = useRef();
  const zipedFile = useRef();
  const socket = useRef();
  const socketRecv = useRef();
  const sendPeer = useRef();
  const recvPeer = useRef();
  let { t } = useTranslation("");

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
      setConnect(true);
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

  const ioConnect = () => {
    socket.current = io.connect(SOCKET_URL, { path: PATH_URL });
    socket.current.on("create room done", (roomID) => {
      setSenderRoomID(roomID);
      setSendLoading(false);
    });

    socket.current.on("user joined", (payload) => {
      sendPeer.current = addPeer(payload.signal, payload.callerID);
    });

    socket.current.on("disconnect", () => {
      //console.log("disconnect");
      //fileInfo.current = undefined;
      //setSenderRoomID("");
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
                newArray[i] = { ...newArray[i], progress: sentBytes };
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

  function addPeer(incomingSignal, callerID) {
    //console.log("add Peer:");

    const peer = new Peer({
      initiator: false,
      trickle: false,
    });

    peer.on("signal", (signal) => {
      //console.log("signal");
      socket.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);
    setConnect(true);

    peer.on("connect", () => {
      socket.current.disconnect();
      //console.log("connected");
      //console.log(JSON.stringify({ fileInfo: fileInfo.current }));
      peer.send(JSON.stringify({ fileInfo: fileInfo.current }));
      sendFile();
    });

    /*peer.on("data", () => {
      //console.log("sendFile");
      sendFile();
    });*/

    return peer;
  }

  function sendFile() {
    // peer is the SimplePeer object connection to receiver
    const spf = new SimplePeerFiles();
    for (var i = 0; i < file.current.length; i++) {
      ////console.log(i.toString());
      spf
        .send(sendPeer.current, i.toString(), file.current[i])
        .then((transfer) => {
          transfer.on("progress", (sentBytes) => {
            let newArray = fileInfo.current;
            newArray[i] = { ...newArray[i], progress: sentBytes };
            fileInfo.current = [...newArray];
            setRefresh((prev) => !prev);
          });
          transfer.on("done", () => {
            //console.log("done");
          });

          transfer.start();
        });
    }
  }

  return (
    <Stack
      sx={{
        p: 5,
        minWidth: "100vw",
        minHeight: "100vh",
        alignItems: "center",
        bgcolor: "#eceff5",
      }}
    >
      <NextSeo {...seoDefault} />

      <Stack spacing={5} sx={{ minWidth: 300, pt: 2 }}>
        <AppBar sx={{ bgcolor: "#ffffff" }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Image
              width={60}
              height={60}
              objectFit="contain"
              alt="ic_folder_open"
              src={logo}
            />
            <Typography
              variant="h4"
              sx={{
                color: "#000000",
                fontFamily: "Aldrich",
                fontSize: 40,
              }}
            >
              KAMUI FILE
            </Typography>
          </Stack>
        </AppBar>

        <Paper
          sx={{ pl: 3, pr: 3, pt: 8, pb: 8, borderRadius: 5 }}
          elevation={3}
        >
          <Stack spacing={5} sx={{ alignItems: "center" }}>
            <Stack sx={{ alignItems: "center" }}>
              <Typography variant="h5"> {t("common:titleSend")}</Typography>
              <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
                {t("common:subtitleSend")}
              </Typography>
            </Stack>

            {!sendLoading ? (
              <Dropzone
                connect={connect}
                senderRoomID={senderRoomID}
                onChange={async (files) => {
                  setSendLoading(true);
                  ioConnect();
                  file.current = files;
                  fileInfo.current = await files.map((item) => {
                    return {
                      name: item.name,
                      type: "." + item.name.split(".").pop(),
                      progress: 0,
                    };
                  });

                  setRefresh((prev) => !prev);

                  socket.current.emit("create room");
                }}
              />
            ) : (
              <Stack
                sx={{
                  width: 300,
                  height: 150,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress color="primary" size={22} />
              </Stack>
            )}

            {fileInfo.current && (
              <Stack
                spacing={2}
                sx={{
                  width: "90%",
                }}
              >
                <Stack spacing={3}>
                  {fileInfo.current.map((item, index) => {
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
                          }}
                        >
                          <Typography variant="body2" noWrap>
                            {item.progress}%
                          </Typography>
                          <Progress percentage={item.progress} />
                          <Typography
                            variant="body2"
                            noWrap
                            sx={{
                              maxWidth: 200,
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                  {fileInfo.current.find(
                    (item) => item.progress !== 100
                  ) ? null : (
                    <Button
                      variant="contained"
                      component="span"
                      sx={{ width: "100%" }}
                      onClick={() => {
                        fileInfo.current = undefined;
                        setSenderRoomID(undefined);
                      }}
                    >
                      {t("common:done")}
                    </Button>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Paper>

        <Paper
          sx={{ pl: 3, pr: 3, pt: 5, pb: 5, borderRadius: 5 }}
          elevation={3}
        >
          <Stack spacing={3}>
            <Stack sx={{ alignItems: "center" }}>
              <Typography variant="h5">{t("common:titleRecv")}</Typography>
              <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
                {t("common:subtitleRecv")}
              </Typography>
            </Stack>
            {!recvFileInfo.current ? (
              <Stack spacing={3}>
                <TextField
                  id="outlined-basic"
                  label={t("common:hintRecv")}
                  variant="outlined"
                  type="number"
                  onChange={(e) => setJoinRoomID(e.target.value)}
                  error={joinRoomID !== "" && !regex.test(joinRoomID)}
                  helperText={
                    joinRoomID !== "" && !regex.test(joinRoomID)
                      ? t("common:hintRecv")
                      : ""
                  }
                />
                <Button
                  disabled={loading}
                  variant="contained"
                  component="span"
                  sx={{ width: "100%", height: 40 }}
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
                    t("common:btnRecv")
                  )}
                </Button>
              </Stack>
            ) : (
              <Stack spacing={3}>
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
                                {t("common:download")}
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
                    sx={{ width: "100%" }}
                    onClick={() => {
                      recvFileInfo.current = undefined;
                      setRefresh((prev) => !prev);
                    }}
                  >
                    {t("common:done")}
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
