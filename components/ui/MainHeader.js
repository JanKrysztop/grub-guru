import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  setLoginStatus,
  setUserData,
  setUserName,
} from "@/redux/userSlice";
import { persistor } from "@/redux/store";
import {
  useColorScheme,
  IconButton,
  MenuButton,
  MenuItem,
  Dropdown,
  Menu,
  ListItemDecorator,
  ListDivider,
  Box,
} from "@mui/joy";
import {
  DarkModeRounded,
  LightModeRounded,
  MenuRounded as MenuIcon,
  LocalDiningRounded,
  CalculateRounded,
  NoteAltRounded,
  AccountCircleRounded,
  LogoutRounded,
} from "@mui/icons-material";

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
        <Box>
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
            {mode === "dark" ? <DarkModeRounded /> : <LightModeRounded />}
          </IconButton>
        </Box>
        <Box>
          <img src="/big-logo.svg" alt="Big Logo" width={190} />
        </Box>
        <Box>
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: "plain", color: "neutral" } }}
              sx={{ borderRadius: 40 }}
            >
              <MenuIcon />
            </MenuButton>
            <Menu
              placement="bottom-start"
              variant="soft"
              sx={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "--List-padding": "0.5rem",
                "--ListItemDecorator-size": "3rem",
                // gap: 1,
              }}
            >
              <Link href="/calories-tracker">
                <MenuItem>
                  <ListItemDecorator>
                    <LocalDiningRounded />
                  </ListItemDecorator>{" "}
                  Calories tracker
                </MenuItem>
              </Link>
              <ListDivider />
              <Link href="/calculator">
                <MenuItem>
                  <ListItemDecorator>
                    <CalculateRounded />
                  </ListItemDecorator>{" "}
                  Calculators
                </MenuItem>
              </Link>
              <ListDivider />
              <Link href="/journal">
                <MenuItem>
                  <ListItemDecorator>
                    <NoteAltRounded />
                  </ListItemDecorator>{" "}
                  Journal
                </MenuItem>
              </Link>
              <ListDivider />

              <Link href="/profile">
                <MenuItem>
                  <ListItemDecorator>
                    <AccountCircleRounded />
                  </ListItemDecorator>{" "}
                  Profile
                </MenuItem>
              </Link>
              <ListDivider />
              <MenuItem onClick={handleLogout}>
                <ListItemDecorator>
                  <LogoutRounded />
                </ListItemDecorator>{" "}
                Logout
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Box>
    </header>
  );
};

export default MainHeader;
