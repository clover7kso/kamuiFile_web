import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    WHITE: { main: "#ffffff" },
  },
  typography: {
    fontFamily: "Arial, DelaGothic, Helvetica, Aldrich",
  },
});

export default lightTheme;
