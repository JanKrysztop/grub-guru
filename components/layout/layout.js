import MainHeader from "./main-header";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/userSlice";

import { Container, Box } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
const Layout = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { mode } = useColorScheme();
  const backgroundImage =
    mode === "dark" ? "/dark-background.svg" : "/light-background.svg";
  const backgroundColor = mode === "dark" ? "#292B29" : "#FAFAFA"; // Example colors
  //
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: backgroundColor,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      {isLoggedIn && <MainHeader />}
      <main>{props.children}</main>
    </Box>
  );
};

export default Layout;
