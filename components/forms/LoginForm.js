import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { setLoginStatus, setUserName, setUserData } from "@/redux/userSlice";

//TODO: change all functions to arrow functions for components, add password display, add option with password change with email??, add option to log in with email instead of username
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/login`,
        { username, password },
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 m-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Log in
        </h1>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
