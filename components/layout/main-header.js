import axios from "axios";
import { useState } from "react";
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
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import LocalDining from "@mui/icons-material/LocalDining";
import Calculate from "@mui/icons-material/Calculate";
import NoteAlt from "@mui/icons-material/NoteAlt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import { Container, Box } from "@mui/joy";
import { Note } from "@mui/icons-material";

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
                    <LocalDining />
                  </ListItemDecorator>{" "}
                  Calories tracker
                </MenuItem>
              </Link>
              <ListDivider />
              <Link href="/calculator">
                <MenuItem>
                  <ListItemDecorator>
                    <Calculate />
                  </ListItemDecorator>{" "}
                  Calculators
                </MenuItem>
              </Link>
              <ListDivider />
              <Link href="/journal">
                <MenuItem>
                  <ListItemDecorator>
                    <NoteAlt />
                  </ListItemDecorator>{" "}
                  Journal
                </MenuItem>
              </Link>
              <ListDivider />

              <Link href="/profile">
                <MenuItem>
                  <ListItemDecorator>
                    <AccountCircle />
                  </ListItemDecorator>{" "}
                  Profile
                </MenuItem>
              </Link>
              <ListDivider />
              <MenuItem onClick={handleLogout}>
                <ListItemDecorator>
                  <Logout />
                </ListItemDecorator>{" "}
                Logout
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
        <Box>
          <img src="/big-logo.svg" alt="Big Logo" />
        </Box>
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
            {mode === "dark" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </Box>
    </header>
  );
};

export default MainHeader;
