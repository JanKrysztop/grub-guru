import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { setLoginStatus, setUserName, setUserData } from "@/redux/userSlice";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import Snackbar from "@mui/joy/Snackbar";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Visibility from "@mui/icons-material/Visibility";
import InfoIcon from "@mui/icons-material/Info";
import { useColorScheme } from "@mui/joy/styles";
import { VisibilityOff } from "@mui/icons-material";
const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    localStorage.clear();
    dispatch(setLoginStatus(false));
    dispatch(setUserData(null));
    dispatch(setUserName(null));
  }, [dispatch]);

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

      router.push("/dashboard");
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
              mode === "dark" ? "#hoverColorDarkMode" : "#hoverColorLightMode", // Optionally change the background color on hover for each mode
          },
        }}
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        {mode === "dark" ? <DarkMode /> : <LightMode />}
      </IconButton>
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
                <Visibility onClick={togglePasswordVisibility} />
              ) : (
                <VisibilityOff onClick={togglePasswordVisibility} />
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
              href="/forgot-password"
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
          <InfoIcon />
          {error}
        </Snackbar>
      </Box>
    </>
  );
};

export default LoginForm;
