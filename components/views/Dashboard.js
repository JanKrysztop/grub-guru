import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Dashboard = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/profile",
          { withCredentials: true }
        );
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 m-4 bg-white rounded shadow-md justify-items-center">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Welcome to the Dashboard, {user.username}!
        </h1>
        <div className="text-center">
          <Link
            href="/dashboard/calories-tracker"
            className="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-white text-lg font-semibold tracking-wide transform hover:scale-110 hover:bg-indigo-700"
          >
            Calories tracker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
