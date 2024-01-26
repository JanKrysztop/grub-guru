import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/userSlice";
import { persistor } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserData, setUserName } from "@/redux/userSlice";

import { useColorScheme } from "@mui/joy/styles";
import Switch from "@mui/joy/Switch";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

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

  return (
    <header className="flex justify-between p-5 bg-gray-200">
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>

      <Switch
        size="lg"
        slotProps={{
          input: { "aria-label": "Dark mode" },
          thumb: {
            children: mode === "dark" ? <DarkMode /> : <LightMode />,
          },
        }}
        onChange={() => setMode(mode === "dark" ? "light" : "dark")}
        sx={{ color: mode === "dark" ? "text.tertiary" : "" }}
      />
      <Link href="/" className="text-2xl font-bold">
        Your Logo
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  href="dashboard/profile"
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
                <Link href="/login" className="text-gray-700 hover:text-black ">
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
    </header>
  );
};

export default MainHeader;
