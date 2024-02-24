import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/userSlice";
import { persistor } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserData, setUserName } from "@/redux/userSlice";

import { useColorScheme } from "@mui/joy/styles";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import IconButton from "@mui/joy/IconButton";
import { Container, Box } from "@mui/joy";

//TODO: create custom 404 page
const MainHeader = () => {
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const { mode, setMode } = useColorScheme();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/users/logout`, {
        withCredentials: true,
      });
      // Reset Redux values
      dispatch(setLoginStatus(false));
      dispatch(setUserData(null));
      dispatch(setUserName(null));
      persistor.purge(); // Clear the persisted state
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  // className="flex justify-between p-5 bg-gray-200"
  return (
    <header>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          p: 3,
        }}
      >
        <IconButton
          variant="soft"
          sx={{
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
        <img src="/big-logo.svg" alt="Big Logo" style={{ width: "20%" }} />
        <nav>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-black "
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  {/* You can add a logout function to the context and call it here */}
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/" className="text-gray-700 hover:text-black ">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/authorization"
                    className="text-gray-700 hover:text-black  "
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Box>
    </header>
  );
};

export default MainHeader;
