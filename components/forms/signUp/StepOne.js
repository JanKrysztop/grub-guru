import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import Snackbar from "@mui/joy/Snackbar";
import { useRouter } from "next/router";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import { Button } from "@mui/joy";
import { Female } from "@mui/icons-material";
import { Male } from "@mui/icons-material";
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
  return (
    <Box>
      <Card sx={{ width: 360, py: 5 }}>
        <CardContent>
          <form className="space-y-4">
            <CustomInput
              type="text"
              name="username"
              placeholder="Username"
              value={formState.username}
              onChange={handleInputChange}
            />
            <CustomInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={formState.password}
              onChange={handleInputChange}
              placeholder="Password"
              endDecorator={
                !showPassword ? (
                  <Visibility onClick={togglePasswordVisibility} />
                ) : (
                  <VisibilityOff onClick={togglePasswordVisibility} />
                )
              }
            />
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
            />
            <CustomInput
              type="number"
              name="age"
              placeholder="Age"
              value={formState.age}
              onChange={handleInputChange}
            />
            <CustomInput
              type="number"
              name="height"
              placeholder="Height in cm"
              value={formState.height}
              onChange={handleInputChange}
            />
            <CustomInput
              type="number"
              name="weight"
              placeholder="Weight in kg"
              value={formState.weight}
              onChange={handleInputChange}
            />
            <ToggleButtonGroup
              value={formState.gender}
              onChange={(event, newValue) => {
                handleGenderChange(newValue);
              }}
              spacing={8}
            >
              <Button
                value="female"
                sx={{
                  width: "132px ",
                  height: "40px ",
                  borderRadius: "16px",
                  // backgroundColor: "#292B29",
                  ...(formState.gender === "female" && {
                    backgroundColor: "#F7D9BB!important",
                    color: "#E78B01",
                    border: "2px solid #E78B01 !important",
                  }),
                }}
              >
                Female{" "}
                <Female
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
                  width: "132px ",
                  height: "40px",
                  borderRadius: "16px",
                  // backgroundColor: "#292B29",
                  ...(formState.gender === "male" && {
                    backgroundColor: "#F7D9BB!important",
                    color: "#E78B01",
                    border: "2px solid #E78B01 !important",
                  }),
                }}
              >
                Male{" "}
                <Male
                  sx={{
                    ...(formState.gender === "male" && {
                      color: "#E78B01",
                    }),
                  }}
                />
              </Button>
            </ToggleButtonGroup>
            <CustomButton
              type="button"
              onClick={onNext}
              disabled={
                !formState.username ||
                !formState.password ||
                !formState.email ||
                !formState.age ||
                !formState.height ||
                !formState.weight ||
                !formState.gender
              }
            >
              Next
            </CustomButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StepOne;
