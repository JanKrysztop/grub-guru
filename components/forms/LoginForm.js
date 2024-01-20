import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { setLoginStatus, setUserName, setUserData } from "@/redux/userSlice";

import Input from "@mui/joy/Input";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

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
          placeholder="Username or email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <Input
          placeholder="asdasd"
          size="lg"
          sx={{
            "--Input-focusedInset": "var(--any, )",
            "--Input-focusedThickness": "0.25rem",
            "--Input-focusedHighlight": "#549801",
            "&::before": {
              transition: "box-shadow .15s ease-in-out",
            },
            "&:focus-within": {
              borderColor: "#549801",
            },
          }}
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label>Show Password</label>
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Log in
        </button>
        <div className="text-end mt-2">
          <a
            href="login/forgot-password"
            className="text-m t-3 text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
