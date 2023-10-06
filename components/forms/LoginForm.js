import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
//TODO: change all functions to arrow functions for components, add password display, add option with password change with email??, add option to log in with email instead of username
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://7foiszp0t0.execute-api.eu-north-1.amazonaws.com/dev/users/login",
        { username, password },
        { withCredentials: true }
      );
      //dont use local storage cookies are safer
      //   localStorage.setItem("token", response.data.token);
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
