// theme.js
//TODO: is this needed?
import { createTheme } from "@mui/joy/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    // define light theme colors
  },
  // other theme settings
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // define dark theme colors
  },
  // other theme settings
});

export { lightTheme, darkTheme };
