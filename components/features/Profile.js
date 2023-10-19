import React, { useContext, useState } from "react";
import UserContext from "@/contexts/userContext";

const Profile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
    age: userData?.age || "",
    weight: userData?.weight || "",
    // ... any other user data fields
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call API to save updated data
    // Then update the context with the new data
    setUserData(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Profile
        </h1>

        {isEditing ? (
          <>
            <input
              type="text"
              name="username"
              value={updatedData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Email"
            />
            {/* Add other input fields as needed */}
            <button
              onClick={handleSave}
              className="w-full px-3 py-2 text-white bg-green-500 rounded hover:bg-green-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Username:</strong> {userData?.username}
            </p>
            <p>
              <strong>Email:</strong> {userData?.email}
            </p>
            <p>
              <strong>Age:</strong> {userData?.age}
            </p>
            <p>
              <strong>Weight:</strong> {userData?.weight}
            </p>

            {/* Display other user data as needed */}
            <button
              onClick={handleEdit}
              className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 mt-4"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
