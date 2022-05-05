import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import SimplePeerFiles from "simple-peer-files";
import fileDownload from "js-file-download";
import Dropzone from "../components/DropZone";
import ICFile from "../public/ic_file.svg";
import { Box } from "@mui/system";
import Progress from "../components/Progress";
import { Done } from "@mui/icons-material";

export default function Home() {
  const [connect, setConnect] = useState(false);
  const [kamuiScale, setKamuiScale] = useState(0);

  const [senderRoomID, setSenderRoomID] = useState("");
  const [joinRoomID, setJoinRoomID] = useState("");
  const [refresh, setRefresh] = useState(false);

  const file = useRef();
  const fileInfo = useRef();
  const recvFileInfo = useRef();
  const zipedFile = useRef();
  const socket = useRef();
  const socketRecv = useRef();
  const sendPeer = useRef();
  const recvPeer = useRef();
  //

  const ioJoin = () => {
    socketRecv.current = io.connect("ws://localhost:4000");

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
    });

    socketRecv.current.on("room full", () => {
      //console.log("room full");
      alert("room is full");
    });
  };

  const ioConnect = () => {
    socket.current = io.connect("ws://localhost:4000");
    socket.current.on("create room done", (roomID) => {
      setSenderRoomID(roomID);
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
      <Stack spacing={5} sx={{ minWidth: 300 }}>
        <Paper
          sx={{ pl: 3, pr: 3, pt: 8, pb: 8, borderRadius: 5 }}
          elevation={3}
        >
          <Stack spacing={5} sx={{ alignItems: "center" }}>
            <Stack sx={{ alignItems: "center" }}>
              <Typography variant="h5">Upload your files</Typography>
              <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
                Fast and safe file transfer
              </Typography>
            </Stack>

            <Dropzone
              connect={connect}
              senderRoomID={senderRoomID}
              onChange={async (files) => {
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
                      Done
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
              <Typography variant="h5">Receive your files</Typography>
              <Typography variant="body8" sx={{ color: "#aaaaaa" }}>
                I'm Ready
              </Typography>
            </Stack>
            {!recvFileInfo.current ? (
              <Stack spacing={3}>
                <TextField
                  id="outlined-basic"
                  label="6 digit number"
                  variant="outlined"
                  type="number"
                  onChange={(e) => setJoinRoomID(e.target.value)}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{ width: "100%" }}
                  onClick={() => {
                    ioJoin();
                    socketRecv.current.emit("join room", joinRoomID);
                  }}
                >
                  Drop me files!
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
                              maxWidth: 200,
                            }}
                          >
                            {item.name}
                          </Typography>
                          {item.file ? (
                            <Button
                              sx={{ p: 0, ml: 2 }}
                              onClick={() => fileDownload(item.file, item.name)}
                            >
                              <Typography
                                variant="body2"
                                noWrap
                                sx={{
                                  maxWidth: 200,
                                }}
                              >
                                Download
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
                    variant="contained"
                    component="span"
                    sx={{ width: "100%" }}
                    onClick={() => {
                      recvFileInfo.current = undefined;
                      setRefresh((prev) => !prev);
                    }}
                  >
                    Done
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
