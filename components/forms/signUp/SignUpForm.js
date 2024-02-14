import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

import Box from "@mui/joy/Box";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepButton from "@mui/joy/StepButton";
import StepIndicator from "@mui/joy/StepIndicator";
import Check from "@mui/icons-material/Check";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import Snackbar from "@mui/joy/Snackbar";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectBmrFormulas } from "@/redux/bmrSlice";
import { selectActivityLevels } from "@/redux/activitySlice";

const SignUpForm = () => {
  const bmrFormulas = useSelector(selectBmrFormulas);
  const activityLevels = useSelector(selectActivityLevels);

  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    recommendedCalories: "",
  });

  const [weightGoal, setWeightGoal] = useState("0.00");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState(activityLevels[0].value);

  const [currentStep, setCurrentStep] = useState(0);
  const [formula, setFormula] = useState("");
  const [error, setError] = useState(null);

  const [confirmation, setConfirmation] = useState({
    show: false,
    type: "",
  });

  useEffect(() => {
    const { weight, height } = formState;
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      const newFormula = calculatedBmi >= 30 ? "Mifflin" : "Harris";
      setFormula(newFormula);
    }
  }, [formState.weight, formState.height]);

  const calculateUserCalories = () => {
    const { weight, height, age, gender } = formState;
    if (
      weight &&
      height &&
      age &&
      gender &&
      bmrFormulas[formula] &&
      bmrFormulas[formula][gender]
    ) {
      const calculatedBmr = bmrFormulas[formula][gender](weight, height, age);
      console.log("BMR", calculatedBmr);
      const calculatedTdee = calculatedBmr * activity;
      console.log("TDEE", calculatedTdee);
      const goalCalories = weightGoal * 7000;
      console.log("GOAL", goalCalories);
      let finalCalories;
      if (goal === "lose") {
        finalCalories = Math.ceil(calculatedTdee - goalCalories / 7);
        console.log("Final calories", finalCalories);
        if (finalCalories < calculatedBmr) {
          setError("Calories below BMR. Adjust your goal.");
        } else {
          setFormState((prevState) => ({
            ...prevState,
            recommendedCalories: finalCalories,
          }));
          setError(null);
        }
      } else if (goal === "gain") {
        finalCalories = calculatedTdee + goalCalories;
        setFormState((prevState) => ({
          ...prevState,
          recommendedCalories: finalCalories,
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          recommendedCalories: calculatedTdee,
        }));
      }
    }
  };

  useEffect(() => {
    calculateUserCalories();
  }, [activity, weightGoal, formula]);

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenderChange = (gender) => {
    setFormState({
      ...formState,
      gender,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      calculateUserCalories();
      console.log(formState);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/register`,
        formState
      );
      setConfirmation({ show: true, type: "success" });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      setConfirmation({ show: true, type: "error" });
    }
  };

  const steps = [
    <StepOne
      key="Basics"
      onNext={() => setCurrentStep((s) => s + 1)}
      formState={formState}
      handleInputChange={handleInputChange}
      handleGenderChange={handleGenderChange}
    />,
    <StepTwo
      key="Goal"
      onNext={() => setCurrentStep((s) => s + 1)}
      onPrev={() => setCurrentStep((s) => s - 1)}
      goal={goal}
      setGoal={setGoal}
    />,
    <StepThree
      key="Plan"
      onSubmit={handleSubmit}
      onPrev={() => setCurrentStep((s) => s - 1)}
      weightGoal={weightGoal}
      setWeightGoal={setWeightGoal}
      activity={activity}
      setActivity={setActivity}
      activityLevels={activityLevels}
      goal={goal}
      error={error}
    />,
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <Box
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
        <Stepper sx={{ width: "100%" }}>
          {steps.map((step, index) => (
            <Step
              key={step.key}
              indicator={
                <StepIndicator
                  variant={currentStep <= index ? "soft" : "solid"}
                  color={currentStep < index ? "neutral" : "success"}
                  sx={{
                    // ...(currentStep < index && {
                    //   bgcolor: "#549801",
                    // }),
                    ...(currentStep === index && {
                      bgcolor: "#549801",
                    }),
                  }}
                >
                  {currentStep <= index ? index + 1 : <Check />}
                </StepIndicator>
              }
              sx={{
                "&::after": {
                  ...(currentStep > index &&
                    index !== steps.length - 1 && { bgcolor: "#549801" }),
                },
              }}
            >
              <StepButton onClick={() => setCurrentStep(index)}>
                {step.key}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      {!confirmation.show ? (
        <>{steps[currentStep]}</>
      ) : (
        <div className="p-4 max-w-md mx-auto">
          {confirmation.type === "success" ? (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
              role="alert"
            >
              <p className="font-bold">Success</p>
              <p className="mb-4">Registration successful! Welcome aboard.</p>
              <Link
                href="/"
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700"
              >
                Log in to your account
              </Link>
            </div>
          ) : (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>Registration failed. Please try again later.</p>
            </div>
          )}
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={error}
        variant="solid"
        color="danger"
        size="lg"
      >
        <InfoIcon />
        {error}
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
