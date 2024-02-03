import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { setLoginStatus, setUserName, setUserData } from "@/redux/userSlice";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import CustomInput from "@/components/ui/CustomInput";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import Visibility from "@mui/icons-material/Visibility";
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
  }, []);

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
          // justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <img src="/big-logo.svg" className="mb-16 md:mt-16" />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: "sm",
            p: 3,
            m: 2,
          }}
        >
          {error && (
            <Typography sx={{ mb: 4, color: "danger.main" }}>
              {error}
            </Typography>
          )}

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
            endDecorator={
              !showPassword ? (
                <Visibility onClick={togglePasswordVisibility} />
              ) : (
                <VisibilityOff onClick={togglePasswordVisibility} />
              )
            }
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", mt: 2 }}
          >
            Log in
          </Button>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Link href="/forgot-password" underline="hover">
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </Box>
    </>
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="w-full max-w-sm p-8 m-4 bg-white rounded shadow-md"
    //   >
    //     <CustomInput
    //       placeholder="User Name"
    //       type="text"
    //       value={login}
    //       onChange={(e) => setLogin(e.target.value)}
    //     />
    //     <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
    //       Log in
    //     </h1>
    //     {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    //     <input
    //       type="text"
    //       placeholder="Username or email"
    //       value={login}
    //       onChange={(e) => setLogin(e.target.value)}
    //       className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //     />
    //     <input
    //       type={showPassword ? "text" : "password"}
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //     />

    //     <div className="flex items-center mb-4">
    //       <input
    //         type="checkbox"
    //         checked={showPassword}
    //         onChange={() => setShowPassword(!showPassword)}
    //         className="mr-2"
    //       />
    //       <label>Show Password</label>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
    //     >
    //       Log in
    //     </button>
    //     <div className="text-end mt-2">
    //       <a
    //         href="login/forgot-password"
    //         className="text-m t-3 text-blue-500 hover:underline"
    //       >
    //         Forgot Password?
    //       </a>
    //     </div>
    //   </form>
    // </div>
  );
};

export default LoginForm;
