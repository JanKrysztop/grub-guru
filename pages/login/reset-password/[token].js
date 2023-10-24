import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    console.log("handleSubmit is being called");
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/reset-password`,
        { token, password }
      );
      console.log("RESET", token, password);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "An error occurred while resetting the password."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 m-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Reset Password
        </h1>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {success && (
          <p className="mb-4 text-sm text-green-500">
            Password reset successfully! You can now log in with your new
            password.
          </p>
        )}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
