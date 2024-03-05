import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData, setUserData } from "@/redux/userSlice";
import axios from "axios";
import { Box } from "@mui/joy";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/joy/Typography";
import Badge from "@mui/joy/Badge";
import { Edit } from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import Button from "@mui/joy/Button";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "sm",
          p: 3,
          m: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "120px",
              height: "120px",
              bgcolor: "background.surface",
              borderRadius: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              border: "5px solid #549801",
              position: "relative",
            }}
          >
            <AccountCircle
              sx={{
                fontSize: "var(--Icon-fontSize, 120px)",
                color: "#549801",
              }}
            />
            <IconButton
              size="md"
              variant="solid"
              onClick={handleEdit}
              sx={{
                position: "absolute",
                bottom: -10,
                right: -5,
                width: "20px",
                height: "20px",
                borderRadius: "20px",
              }}
            >
              <Edit />
            </IconButton>
          </Box>
        </Box>

        {isEditing ? (
          <>
            <label htmlFor="username">
              <Typography sx={{ mb: 1 }}>Username</Typography>
            </label>
            <CustomInput
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={updatedData.username}
              onChange={handleInputChange}
              className="mb-2"
            />

            <label htmlFor="age">
              <Typography sx={{ mb: 1 }}> Age</Typography>
            </label>
            <CustomInput
              type="text"
              id="age"
              name="age"
              placeholder="Age"
              value={updatedData.age}
              onChange={handleInputChange}
              className="mb-2"
            />

            <label htmlFor="weight">
              <Typography sx={{ mb: 1 }}> Weight</Typography>
            </label>
            <CustomInput
              type="text"
              id="weight"
              name="weight"
              placeholder="Weight"
              value={updatedData.weight}
              onChange={handleInputChange}
              className="mb-2"
            />
            <label htmlFor="recommendedCalories">
              <Typography sx={{ mb: 1 }}> Daily calories</Typography>
            </label>
            <CustomInput
              type="text"
              id="recommendedCalories"
              name="recommendedCalories"
              placeholder="Calories"
              value={updatedData.recommendedCalories}
              onChange={handleInputChange}
              className="mb-7"
            />
            <CustomButton onClick={handleSave} sx={{ mb: 2 }}>
              Save
            </CustomButton>
            <CustomButton
              styleType="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </CustomButton>
          </>
        ) : (
          !isChangingPassword && (
            <>
              <Typography
                sx={{
                  fontSize: "18px",
                  mt: 2,
                  mb: 1,
                }}
              >
                <strong>Username:</strong> {userData?.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  mt: 2,
                  mb: 1,
                }}
              >
                <strong>Email:</strong> {userData?.email}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  mt: 2,
                  mb: 1,
                }}
              >
                <strong>Age:</strong> {userData?.age}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  mt: 2,
                  mb: 1,
                }}
              >
                <strong>Weight:</strong> {userData?.weight}
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  mt: 2,
                  mb: 1,
                }}
              >
                <strong>Daily calories:</strong> {userData?.recommendedCalories}
              </Typography>
            </>
          )
        )}
        {isChangingPassword ? (
          <>
            <label htmlFor="currentPassword">
              <Typography sx={{ mb: 1 }}>Current Password</Typography>
            </label>
            <CustomInput
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="mb-2"
            />
            <label htmlFor="newPassword">
              <Typography sx={{ mb: 1 }}>New Password</Typography>
            </label>
            <CustomInput
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="mb-7"
            />
            <CustomButton onClick={handleChangePassword} sx={{ mb: 2 }}>
              Save
            </CustomButton>
            <CustomButton
              styleType="secondary"
              onClick={() => setIsChangingPassword(false)}
            >
              Cancel
            </CustomButton>
          </>
        ) : (
          !isEditing && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              marginTop={1}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                }}
              >
                <strong>Password:</strong>
              </Typography>
              <Button
                onClick={() => setIsChangingPassword(true)}
                variant="plain"
                size="xl"
                color="warning"
                sx={{
                  p: 1,
                  color: "#E78B01",
                }}
              >
                Change password
              </Button>
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Profile;
