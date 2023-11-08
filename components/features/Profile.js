import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, setUserData } from "@/redux/userSlice";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
    age: userData?.age || "",
    weight: userData?.weight || "",
    recommendedCalories: userData?.recommendedCalories || "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const updateProfile = async (payload) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/update-profile`,
        payload,
        { withCredentials: true }
      );
      console.log(response.data);

      // Update the Redux store with the new user data
      dispatch(setUserData(response.data.user));
    } catch (error) {
      console.error("Error upadting profile", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/change-password`,
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      // Reset the form or show a success message
    } catch (error) {
      console.error("Error changing password", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const payload = {
      userId: userData._id,
      username: updatedData.username,
      age: updatedData.age,
      weight: updatedData.weight,
      recommendedCalories: updatedData.recommendedCalories,
    };
    updateProfile(payload);
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
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={updatedData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />

            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="age"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={updatedData.age}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Age"
            />

            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="weight"
            >
              Weight
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={updatedData.weight}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Weight"
            />
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="recommendedCalories"
            >
              Daily calories
            </label>
            <input
              type="text"
              id="recommendedCalories"
              name="recommendedCalories"
              value={updatedData.recommendedCalories}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Calories"
            />
            <button
              onClick={handleSave}
              className="w-full px-3 py-2 text-white bg-green-500 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full px-3 py-2 text-white bg-gray-500 rounded hover:bg-gray-700 mt-4"
            >
              Cancel
            </button>
          </>
        ) : (
          !isChangingPassword && (
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
              <p>
                <strong>Daily calories:</strong> {userData?.recommendedCalories}
              </p>
              <button
                onClick={handleEdit}
                className="w-full px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 mt-4"
              >
                Edit Profile
              </button>
            </>
          )
        )}
        {isChangingPassword ? (
          <>
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Current Password"
            />

            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="New Password"
            />

            <button
              onClick={handleChangePassword}
              className="w-full px-3 py-2 text-white bg-green-500 rounded hover:bg-green-700"
            >
              Change Password
            </button>
            <button
              onClick={() => setIsChangingPassword(false)}
              className="w-full px-3 py-2 text-white bg-gray-500 rounded hover:bg-gray-700 mt-4"
            >
              Cancel
            </button>
          </>
        ) : (
          !isEditing && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="w-full px-3 py-2 text-white bg-red-500 rounded hover:bg-red-700 mt-4"
            >
              Change Password
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
