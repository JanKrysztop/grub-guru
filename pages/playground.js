import CustomInput from "@/components/ui/CustomInput";
import { Container, useColorScheme } from "@mui/joy";

const Playground = (props) => {
  const { mode } = useColorScheme();
  const backgroundColor = mode === "dark" ? "#292B29" : "#FAFAFA"; // Example colors
  const backgroundImage =
    mode === "dark" ? "/dark-background.svg" : "/light-background.svg";
  // style={{ backgroundImage: `url(${backgroundImage})` }}
  return (
    <Container
      sx={{
        height: "1000px",
        display: "flex",
        alignItems: "center",
        backgroundColor: backgroundColor, // Apply conditional background color
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <CustomInput placeholder="User Name" type="text" />
    </Container>
  );
};

export default Playground;
