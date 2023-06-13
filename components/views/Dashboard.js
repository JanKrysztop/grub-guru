import { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="p-8 m-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Welcome to the Dashboard, {user.username}!
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
