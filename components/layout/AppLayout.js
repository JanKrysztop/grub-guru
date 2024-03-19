import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/userSlice";
import LoggedInLayout from "./LoggedInLayout";
import LoggedOutLayout from "./LoggedOutLayout";

const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Determine which layout to use based on the user's login status
  const CurrentLayout = isLoggedIn ? LoggedInLayout : LoggedOutLayout;

  return <CurrentLayout>{children}</CurrentLayout>;
};

export default Layout;
