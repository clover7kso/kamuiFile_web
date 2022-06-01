import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import SimplePeerFiles from "simple-peer-files";
import Dropzone from "../components/DropZone";
import ICFile from "../public/ic_file.svg";
import { Box } from "@mui/system";
import Progress from "../components/Progress";
import useTranslation from "next-translate/useTranslation";
import { DESKTOP } from "../util/mediaQuery";

const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:4000"
    : "wss://kamuifile.com";
const PATH_URL = process.env.NODE_ENV === "development" ? "" : "/backend";

const Sender = () => {
  const isPc = useMediaQuery(DESKTOP);
  //console.log(isPc);
  const [connect, setConnect] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const [senderRoomID, setSenderRoomID] = useState("");

  const [refresh, setRefresh] = useState(false);

  const file = useRef();
  const fileInfo = useRef();
  const socket = useRef();
  const sendPeer = useRef();
  let { t } = useTranslation("");

  const ioConnect = () => {
    socket.current = io.connect(SOCKET_URL, { path: PATH_URL });
    socket.current.on("create room done", (roomID) => {
      setSenderRoomID(roomID);
      setSendLoading(false);
      setConnect(true);
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
      setConnect(false);
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
    <Paper sx={{ pl: 3, pr: 3, pt: 8, pb: 8, borderRadius: 2 }} elevation={3}>
      <Stack spacing={5} sx={{ alignItems: "center" }}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h5"> {t("common:titleSend")}</Typography>
          <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
            {t("common:subtitleSend")}
          </Typography>
        </Stack>

        {!sendLoading ? (
          <Dropzone
            onTimerDone={() => {
              fileInfo.current = undefined;
              setSenderRoomID(undefined);
              socket.current.disconnect();
              setConnect(false);
            }}
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
              {fileInfo.current.find((item) => item.progress !== 100) ? null : (
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
  );
};

export default Sender;
