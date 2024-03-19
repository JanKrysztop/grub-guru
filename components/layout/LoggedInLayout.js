import MainHeader from "../ui/MainHeader";
import { Box } from "@mui/joy";
import useThemeSettings from "@/hooks/useThemeSettings";

const LoggedInLayout = (props) => {
  const { backgroundImage, backgroundColor } = useThemeSettings();

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: backgroundColor,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <MainHeader />
      <main>{props.children}</main>
    </Box>
  );
};

export default LoggedInLayout;
