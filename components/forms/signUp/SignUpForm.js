import { useState, useEffect } from "react";
import axios from "axios";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

//TODO: move activity levels to redux?
const activityLevels = [
  { id: 1, label: "Sedentary (little or no exercise)", value: 1.2 },
  {
    id: 2,
    label: "Lightly active (light exercise/sports 1-3 days/week)",
    value: 1.375,
  },
  {
    id: 3,
    label: "Moderately active (moderate exercise/sports 3-5 days/week)",
    value: 1.55,
  },
  {
    id: 4,
    label: "Very active (hard exercise/sports 6-7 days a week)",
    value: 1.725,
  },
  {
    id: 5,
    label: "Extra active (very hard exercise/physical job & exercise)",
    value: 1.9,
  },
];
//TODO: put this into redux?
const bmrFormulas = {
  Harris: {
    male: (weight, height, age) =>
      13.397 * weight + 4.799 * height - 5.677 * age + 88.362,
    female: (weight, height, age) =>
      9.247 * weight + 3.098 * height - 4.33 * age + 447.593,
  },
  Mifflin: {
    male: (weight, height, age) => 10 * weight + 6.25 * height - 5 * age + 5,
    female: (weight, height, age) =>
      10 * weight + 6.25 * height - 5 * age - 161,
  },
};

const SignUpForm = () => {
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
  //TODO: move those into formState
  const [weightGoal, setWeightGoal] = useState("0.00");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState(activityLevels[0].value);

  const [currentStep, setCurrentStep] = useState(0);
  const [formula, setFormula] = useState("");
  const [error, setError] = useState("");

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
          setError("");
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
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_MAIN_URL}/users/register`,
      //   formState
      // );

      // console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const steps = [
    <StepOne
      key="step1"
      onNext={() => setCurrentStep((s) => s + 1)}
      formState={formState}
      handleInputChange={handleInputChange}
      handleGenderChange={handleGenderChange}
    />,
    <StepTwo
      key="step2"
      onNext={() => setCurrentStep((s) => s + 1)}
      onPrev={() => setCurrentStep((s) => s - 1)}
      goal={goal}
      setGoal={setGoal}
    />,
    <StepThree
      key="step3"
      onSubmit={handleSubmit}
      onPrev={() => setCurrentStep((s) => s - 1)}
      weightGoal={weightGoal}
      setWeightGoal={setWeightGoal}
      activity={activity}
      setActivity={setActivity}
      activityLevels={activityLevels}
    />,
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {error && <p className="error-message">{error}</p>}
      {steps[currentStep]}
    </div>
  );
};

export default SignUpForm;
