import MainHeader from "./main-header";

import { selectIsLoggedIn } from "@/redux/userSlice";
import { useEffect } from "react";
import { Container, Box } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import IconButton from "@mui/joy/IconButton";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

import { useSelector, useDispatch } from "react-redux";
import { setMainBackground, setComponentBackground } from "@/redux/themeSlice";
import { selectMainBackground } from "@/redux/themeSlice";

const Layout = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { mode, setMode } = useColorScheme();
  const backgroundImage =
    mode === "dark" ? "/dark-background.svg" : "/light-background.svg";
  // const backgroundColor = mode === "dark" ? "#292B29" : "#FAFAFA"; // Example colors

  const backgrounds = {
    dark: { main: "#292B29", component: "#494B47" },
    light: { main: "#FAFAFA", component: "#FAFAFA" },
  };
  useEffect(() => {
    const { main, component } = backgrounds[mode] || backgrounds.light;
    dispatch(setMainBackground(main));
    dispatch(setComponentBackground(component));
  }, [mode, dispatch]);

  const backgroundColor = useSelector(selectMainBackground);
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: backgroundColor,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {isLoggedIn ? (
        <MainHeader />
      ) : (
        <IconButton
          variant="soft"
          size="lg"
          sx={{
            margin: "1rem",

            borderRadius: "40px",
            backgroundColor: mode === "dark" ? "#292b29" : "#fafafa", // Replace '#yourLightModeColor' with the desired color for light mode
            transition: "transform 0.3s ease-in-out", // Smooth transition for the hover effect
            "&:hover": {
              transform: "scale(1.1)", // Slightly increase the size on hover
              backgroundColor:
                mode === "dark"
                  ? "#hoverColorDarkMode"
                  : "#hoverColorLightMode", // Optionally change the background color on hover for each mode
            },
          }}
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      )}
      <main>{props.children}</main>
    </Box>
  );
};

export default Layout;
