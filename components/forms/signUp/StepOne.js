import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectComponentBackground } from "@/redux/themeSlice";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import {
  Box,
  Snackbar,
  ToggleButtonGroup,
  Button,
  LinearProgress,
  Typography,
} from "@mui/joy";
import {
  VisibilityOffRounded,
  VisibilityRounded,
  InfoRounded,
  FemaleRounded,
  MaleRounded,
} from "@mui/icons-material";

const StepOne = ({
  onNext,
  formState,
  handleInputChange,
  handleGenderChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [error, setError] = useState({ field: null, message: null });
  const [conditions, setConditions] = useState({
    minLength: false,
    number: false,
    lowerCase: false,
    upperCase: false,
    specialChar: false,
  });
  const backgroundColor = useSelector(selectComponentBackground);
  const checkUnique = async (event) => {
    event.preventDefault();
    const { username, email } = formState;
    const payload = {
      username: username,
      email: email,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/check-unique`,
        payload
      );
      console.log(response);
      onNext();
    } catch (error) {
      setError({ field: null, message: null });
      console.log(error);
      const message = error.response.data.error;
      if (
        message.toLowerCase().includes("username") &&
        message.toLowerCase().includes("email")
      ) {
        setError({
          field: "both",
          message: "Both username and email are already taken.",
        });
      } else if (message.toLowerCase().includes("username")) {
        setError({ field: "username", message: "Username is already taken." });
      } else if (message.toLowerCase().includes("email")) {
        setError({ field: "email", message: "Email is already registered." });
      }
    }
  };
  useEffect(() => {
    const minLength = formState.password.length >= 8;
    const number = /[0-9]/.test(formState.password);
    const lowerCase = /[a-z]/.test(formState.password);
    const upperCase = /[A-Z]/.test(formState.password);
    const specialChar = /[^a-zA-Z0-9]/.test(formState.password);

    setConditions({ minLength, number, lowerCase, upperCase, specialChar });
  }, [formState.password]);
  const totalConditions = Object.values(conditions).filter(Boolean).length;
  const strength = Math.min((totalConditions * 100) / 5, 100);

  const formatConditionText = (condition) => {
    switch (condition) {
      case "minLength":
        return "8 characters, ";
      case "number":
        return "1 number, ";
      case "lowerCase":
        return "1 lower case, ";
      case "upperCase":
        return "1 upper case, ";
      case "specialChar":
        return "1 special character";
      default:
        return "";
    }
  };

  return (
    <Box
      component="form"
      onSubmit={checkUnique}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "sm",
        p: 3,
        m: 2,
      }}
    >
      <CustomInput
        type="text"
        name="username"
        placeholder="Username"
        value={formState.username}
        onChange={handleInputChange}
        className="mb-7"
        style={
          error.field === "username" || error.field === "both"
            ? { borderColor: "red", boxShadow: "0 0 0 2px red" }
            : {}
        }
        required
      />
      <CustomInput
        name="password"
        type={showPassword ? "text" : "password"}
        value={formState.password}
        onChange={handleInputChange}
        placeholder="Password"
        endDecorator={
          !showPassword ? (
            <VisibilityRounded onClick={togglePasswordVisibility} />
          ) : (
            <VisibilityOffRounded onClick={togglePasswordVisibility} />
          )
        }
        required
      />
      <LinearProgress
        determinate
        value={strength}
        sx={{
          my: 1,
          width: "100%",
          bgcolor: "background.level3",
          color: "#549801",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyItems: "start",
          width: "100%",
        }}
        className="mb-2"
      >
        {Object.entries(conditions).map(([key, value]) => (
          <Typography
            key={key}
            sx={{
              color: value ? "green" : "red",
              fontSize: "11px",
            }}
          >
            {formatConditionText(key)}
          </Typography>
        ))}
      </Box>
      <CustomInput
        type="email"
        name="email"
        placeholder="Email"
        value={formState.email}
        onChange={handleInputChange}
        className="mb-7"
        style={
          error.field === "email" || error.field === "both"
            ? { borderColor: "red", boxShadow: "0 0 0 2px red" }
            : {}
        }
        required
      />
      <CustomInput
        type="number"
        name="age"
        placeholder="Age"
        value={formState.age}
        onChange={handleInputChange}
        className="mb-7"
        required
      />
      <CustomInput
        type="number"
        name="height"
        placeholder="Height in cm"
        value={formState.height}
        onChange={handleInputChange}
        className="mb-7"
        required
      />
      <CustomInput
        type="number"
        name="weight"
        placeholder="Weight in kg"
        value={formState.weight}
        onChange={handleInputChange}
        className="mb-7"
        required
      />
      <ToggleButtonGroup
        value={formState.gender}
        onChange={(event, newValue) => {
          handleGenderChange(newValue);
        }}
        className="mb-7"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        required
      >
        <Button
          value="female"
          sx={{
            width: "180px ",
            height: "40px ",
            borderRadius: "16px",

            backgroundColor: backgroundColor,
            ...(formState.gender === "female" && {
              backgroundColor: "#F7D9BB!important",
              color: "#E78B01",
              border: "2px solid #E78B01 !important",
            }),
          }}
        >
          Female{" "}
          <FemaleRounded
            sx={{
              ...(formState.gender === "female" && {
                color: "#E78B01",
              }),
            }}
          />
        </Button>
        <Button
          value="male"
          sx={{
            width: "180px ",
            height: "40px",
            borderRadius: "16px",
            backgroundColor: backgroundColor,
            ...(formState.gender === "male" && {
              backgroundColor: "#F7D9BB!important",
              color: "#E78B01",
              border: "2px solid #E78B01 !important",
            }),
          }}
        >
          Male{" "}
          <MaleRounded
            sx={{
              ...(formState.gender === "male" && {
                color: "#E78B01",
              }),
            }}
          />
        </Button>
      </ToggleButtonGroup>
      <CustomButton
        type="submit"
        disabled={
          !formState.username ||
          !formState.password ||
          !formState.email ||
          !formState.age ||
          !formState.height ||
          !formState.weight ||
          !formState.gender ||
          Object.values(conditions).includes(false)
        }
      >
        Next
      </CustomButton>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={4000}
        open={error.message}
        variant="solid"
        color="danger"
        size="lg"
        onClose={() => {
          setError({ field: null, message: null });
        }}
      >
        <InfoRounded />
        {error.message}
      </Snackbar>
    </Box>
  );
};

export default StepOne;
