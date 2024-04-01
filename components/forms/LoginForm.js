import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserName, setUserData } from "@/redux/userSlice";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { useColorScheme } from "@mui/joy/styles";
import { Box, Link, Snackbar, Typography } from "@mui/joy";
import {
  VisibilityOffRounded,
  VisibilityRounded,
  InfoRounded,
} from "@mui/icons-material";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();
  const { mode, setMode } = useColorScheme();
  // useEffect(() => {
  //   localStorage.clear();
  //   dispatch(setLoginStatus(false));
  //   dispatch(setUserData(null));
  //   dispatch(setUserName(null));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/login`,
        { login, password },
        { withCredentials: true }
      );
      dispatch(setLoginStatus(true));
      dispatch(setUserName(response.data.username));

      // Fetch user data after successful login
      try {
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}/users/profile`,
          {
            withCredentials: true,
          }
        );
        console.log("Profile", profileResponse.data);
        dispatch(setUserData(profileResponse.data));
      } catch (profileError) {
        console.error("Error fetching user profile:", profileError);
      }

      router.push("/calories-tracker");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while trying to log in");
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      {/* <IconButton
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
              mode === "dark" ? "#hoverColorDarkMode" : "#hoverColorLightMode", // Optionally change the background color on hover for each mode
          },
        }}
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        {mode === "dark" ? <DarkMode /> : <LightMode />}
      </IconButton> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src="/big-logo.svg" alt="Big Logo" className="py-16 md:mt-16" />
        {/* <Box className="relative w-96 md:w-full h-24 md:h-36 py-16 md:mt-16">
          <Image src="/big-logo.svg" alt="Big Logo" />
        </Box> */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            textAlign: "center",
            width: "100%",
            height: "50vh",
            maxWidth: "sm",
            p: 3,
            m: 2,
          }}
        >
          <CustomInput
            id="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Username or email"
            className="mb-7"
          />

          <CustomInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-7"
            endDecorator={
              !showPassword ? (
                <VisibilityRounded onClick={togglePasswordVisibility} />
              ) : (
                <VisibilityOffRounded onClick={togglePasswordVisibility} />
              )
            }
          />

          <CustomButton type="submit">Log in</CustomButton>
          <Link
            href="/forgot-password"
            underline="hover"
            sx={{
              textAlign: "center",
              color: "#E78B01",
              fontWeight: "100",
              mt: 5,
            }}
          >
            Forgot Password?
          </Link>
        </Box>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Typography>
            {"Don't have an account? "}
            <Link
              href="/authorization"
              underline="hover"
              sx={{ color: "#E78B01" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={4000}
          open={error}
          variant="solid"
          color="danger"
          size="lg"
          onClose={() => {
            setError(null);
          }}
        >
          <InfoRounded />
          {error}
        </Snackbar>
      </Box>
    </>
  );
};

export default LoginForm;
