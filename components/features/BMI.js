import { useState } from "react";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      setBmi(calculatedBmi);
    }

    if (bmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmi < 24.9) {
      setBmiCategory("Normal wieght");
    } else if (bmi < 29.9) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obesity");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <input
        type="number"
        placeholder="Weight in kg"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <input
        type="number"
        placeholder="Height in cm"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
            className="mr-2"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
            className="mr-2"
          />
          Female
        </label>
      </div>
      <button
        onClick={calculateBMI}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Calculate BMI
      </button>
      {bmi && (
        <div>
          <p>Your BMI is {bmi}</p>
          <p>Your BMI category is {bmiCategory}</p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
