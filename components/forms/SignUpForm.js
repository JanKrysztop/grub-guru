import { useState } from "react";
import axios from "axios";
//TODO: add validation to all fields
const StepOne = ({
  onNext,
  formState,
  handleInputChange,
  handleGenderChange,
}) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <form className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formState.username}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formState.age}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formState.height}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formState.weight}
          onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleGenderChange("male")}
            className={`px-4 py-2 rounded-lg ${
              formState.gender === "male"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Male
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange("female")}
            className={`px-4 py-2 rounded-lg ${
              formState.gender === "female"
                ? "bg-pink-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Female
          </button>
        </div>
        <button
          type="button"
          onClick={onNext}
          className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
        >
          Next
        </button>
      </form>
    </div>
  );
};

const StepTwo = ({ onPrev, onNext, goal, setGoal }) => {
  const handleGoalSelection = (selectedGoal) => {
    setGoal(selectedGoal);
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">What do you want to do?</h2>
      <button
        onClick={() => handleGoalSelection("lose")}
        className={`block w-full px-4 py-2 rounded-lg mb-2 ${
          goal === "lose" ? "bg-indigo-500 text-white" : "bg-white border"
        }`}
      >
        Lose Weight
      </button>
      <button
        onClick={() => handleGoalSelection("maintain")}
        className={`block w-full px-4 py-2 rounded-lg mb-2 ${
          goal === "maintain" ? "bg-indigo-500 text-white" : "bg-white border"
        }`}
      >
        Maintain Weight
      </button>
      <button
        onClick={() => handleGoalSelection("gain")}
        className={`block w-full px-4 py-2 rounded-lg mb-4 ${
          goal === "gain" ? "bg-indigo-500 text-white" : "bg-white border"
        }`}
      >
        Gain Weight
      </button>
      <button
        onClick={onPrev}
        className="block w-full px-4 py-2 rounded-lg bg-gray-500 text-white mb-2"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
        disabled={!goal}
      >
        Next
      </button>
    </div>
  );
};

const StepThree = ({
  onPrev,
  onSubmit,
  weightGoal,
  setWeightGoal,
  activity,
  setActivity,
}) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Select your activity</h2>
      <select value={activity} onChange={(e) => setActivity(e.target.value)}>
        {activityLevels.map((level) => (
          <option key={level.id} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
      <h2 className="text-lg font-bold mb-4">Set Your Goal</h2>
      <label htmlFor="weightGoal" className="block mb-2">
        Kilos per week:
      </label>
      <div className="flex items-center mb-4">
        <button
          type="button"
          onClick={() =>
            setWeightGoal((prev) => Math.max(0, prev - 0.1).toFixed(2))
          }
          className="px-4 py-2 rounded-lg bg-gray-200"
        >
          -
        </button>
        <input
          type="text"
          id="weightGoal"
          name="weightGoal"
          value={weightGoal}
          onChange={(e) => setWeightGoal(parseFloat(e.target.value).toFixed(2))}
          className="block w-full mx-2 px-4 py-2 border rounded-lg text-center"
        />
        <button
          type="button"
          onClick={() =>
            setWeightGoal((prev) => (parseFloat(prev) + 0.1).toFixed(2))
          }
          className="px-4 py-2 rounded-lg bg-gray-200"
        >
          +
        </button>
      </div>
      <button
        onClick={onPrev}
        className="block w-full px-4 py-2 rounded-lg bg-gray-500 text-white mb-2"
      >
        Previous
      </button>
      <button
        onClick={onSubmit}
        className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
      >
        Submit
      </button>
    </div>
  );
};
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

function SignUpForm() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  });
  const [weightGoal, setWeightGoal] = useState("0.00");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState(activityLevels[0].value);
  const [currentStep, setCurrentStep] = useState(0);

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
    // Handle form submission here
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/register`,
        formState
      );

      console.log(response.data); // Handle the response data in the UI
    } catch (error) {
      console.error("Error:", error); // Handle the error in the UI
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
    />,
  ];
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {steps[currentStep]}
    </div>
  );
}

export default SignUpForm;
