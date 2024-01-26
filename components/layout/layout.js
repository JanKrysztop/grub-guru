import MainHeader from "./main-header";
import { Container, Box } from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
const Layout = (props) => {
  const { mode } = useColorScheme();
  const backgroundImage =
    mode === "dark" ? "/dark-background.svg" : "/light-background.svg";
  // style={{ backgroundImage: `url(${backgroundImage})` }}
  return (
    <Container>
      <Box>
        <MainHeader />
        <main>{props.children}</main>
      </Box>
    </Container>
  );
};

export default Layout;
