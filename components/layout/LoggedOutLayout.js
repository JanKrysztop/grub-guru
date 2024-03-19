import { Box, IconButton } from "@mui/joy";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import useThemeSettings from "@/hooks/useThemeSettings";

const LoggedOutLayout = (props) => {
  const { backgroundImage, backgroundColor, mode, setMode } =
    useThemeSettings();

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: backgroundColor,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <IconButton
        variant="soft"
        size="lg"
        sx={{
          margin: "1rem",
          borderRadius: "40px",
          backgroundColor: mode === "dark" ? "#292b29" : "#fafafa",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor:
              mode === "dark" ? "#hoverColorDarkMode" : "#hoverColorLightMode",
          },
        }}
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        {mode === "dark" ? <DarkMode /> : <LightMode />}
      </IconButton>
      <main>{props.children}</main>
    </Box>
  );
};

export default LoggedOutLayout;
