import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/redux/userSlice";
import { persistor } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setLoginStatus, setUserData, setUserName } from "@/redux/userSlice";

//TODO: modify header when the user is loggen in, logout option, profile data option, what more??
//TODO: create custom 404 page
const MainHeader = () => {
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

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
