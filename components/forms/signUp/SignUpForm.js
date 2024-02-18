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
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import CardActions from "@mui/joy/CardActions";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/joy/Typography";
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
  const [completedSteps, setCompletedSteps] = useState(["Basics"]);
  const [formula, setFormula] = useState("");
  const [error, setError] = useState(null);

  const [confirmation, setConfirmation] = useState({
    show: false,
    type: "",
  });
  const router = useRouter();
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
  const handleNext = (upcomingStepIndex) => {
    const stepKey = steps[upcomingStepIndex].key; // Get the current step's key

    setCompletedSteps((prevCompletedSteps) => {
      // Ensure we're not duplicating keys in the array
      const newCompletedSteps = new Set([...prevCompletedSteps, stepKey]);
      return [...newCompletedSteps];
    });

    setCurrentStep((s) => s + 1); // Move to the next step
  };

  const steps = [
    <StepOne
      key="Basics"
      onNext={() => handleNext(1)}
      formState={formState}
      handleInputChange={handleInputChange}
      handleGenderChange={handleGenderChange}
    />,
    <StepTwo
      key="Goal"
      onNext={() => handleNext(2)}
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
        justifyContent: "flex-start",
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
              <StepButton
                onClick={() => {
                  const stepKey = steps[index].key;
                  if (completedSteps.includes(stepKey)) {
                    setCurrentStep(index);
                  }
                }}
              >
                {step.key}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexGrow: 1, // Allows this box to grow and fill the space, pushing the stepper up
          maxWidth: "sm",
        }}
      >
        {!confirmation.show ? (
          <>{steps[currentStep]}</>
        ) : (
          <>
            {confirmation.type === "success" ? (
              // <Card
              //   sx={{
              //     textAlign: "center",
              //     alignItems: "center",
              //     width: "100%", // Ensures card takes full width
              //   }}
              // >
              //   <CardOverflow
              //     variant="solid"
              //     sx={{
              //       backgroundColor: "#549801",
              //       display: "flex",
              //       justifyContent: "center",
              //       alignItems: "center",
              //       position: "relative", // Ensure CardOverflow is positioned relatively to contain the Box
              //       paddingTop: "100px",
              //       marginBottom: "60px",
              //     }}
              //   >
              //     <Box
              //       sx={{
              //         width: "120px",
              //         height: "120px",
              //         bgcolor: "background.surface",
              //         borderRadius: "60px",
              //         border: "2px solid #549801", // Border color set to #549801
              //         display: "flex",
              //         justifyContent: "center", // Centers img horizontally
              //         alignItems: "center", // Centers img vertically
              //         position: "absolute",
              //       }}
              //     >
              //       <img
              //         src="/carrot.svg" // Ensure this path is correct
              //         alt="Carrot Logo"
              //         style={{
              //           width: "100px", // Set a fixed size or use percentage
              //           height: "100px", // Set a fixed size or use percentage
              //         }}
              //       />
              //     </Box>
              //   </CardOverflow>
              //   <Typography
              //     level="title-lg"
              //     sx={{ mt: "calc(var(--icon-size) / 2)" }}
              //   >
              //     🎊 Success 🎊
              //   </Typography>
              //   <CardContent sx={{ maxWidth: "40ch" }}>
              //     Registration successful! Welcome aboard.
              //   </CardContent>
              //   <CardActions orientation="vertical" buttonFlex={1}>
              //     <CustomButton>Log in to your account</CustomButton>
              //   </CardActions>
              // </Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "top",
                  textAlign: "center",
                  flexGrow: 1, //
                  width: "100%",
                  p: 3,
                  m: 2,
                }}
              >
                <Box
                  sx={{
                    width: "120px",
                    height: "120px",
                    bgcolor: "background.surface",
                    borderRadius: "60px",
                    border: "2px solid #549801", // Border color set to #549801
                    display: "flex",
                    justifyContent: "center", // Centers img horizontally
                    alignItems: "center", // Centers img vertically
                    mb: 8,
                  }}
                >
                  <img
                    src="/carrot.svg" // Ensure this path is correct
                    alt="Carrot Logo"
                    style={{
                      width: "100px", // Set a fixed size or use percentage
                      height: "100px", // Set a fixed size or use percentage
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Registration completed! Welcome aboard.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    mb: 5,
                  }}
                >
                  Confirmation link has been sent to your email.
                </Typography>
                <CustomButton onClick={() => router.push("/")}>
                  Log in to your account
                </CustomButton>
              </Box>
            ) : (
              // <div
              //   className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
              //   role="alert"
              // >
              //   <p className="font-bold">Success</p>
              //   <p className="mb-4">Registration successful! Welcome aboard.</p>
              //   <Link
              //     href="/"
              //     className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700"
              //   >
              //     Log in to your account
              //   </Link>
              // </div>
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                role="alert"
              >
                <p className="font-bold">Error</p>
                <p>Registration failed. Please try again later.</p>
              </div>
            )}
          </>
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
    </Box>
  );
};

export default SignUpForm;
