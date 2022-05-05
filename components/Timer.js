import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Progress from "./Progress";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <Stack
      sx={{
        width: 260,
        alignItems: "center",
        justifyContent: "center",
      }}
      spacing={1}
    >
      <Typography variant="h5">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
      <Progress percentage={(seconds / 30) * 100} />
    </Stack>
  );
};

export default Timer;
