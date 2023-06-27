import { useState, useEffect } from "react";

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

const bmrCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmr, setBmr] = useState(null);
  const [formula, setFormula] = useState("Harris");
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBMR = () => {
    let calculatedBmr = 0;
    if (formula === "Harris") {
      if (gender === "male") {
        calculatedBmr = 13.397 * weight + 4.799 * height - 6.677 * age + 88.362;
        setBmr(calculatedBmr.toFixed(2));
      } else {
        calculatedBmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
        setBmr(calculatedBmr.toFixed(2));
      }
    } else {
      if (gender === "male") {
        calculatedBmr = 10 * weight + 6.25 * height - 5 * age + 5;
        setBmr(calculatedBmr.toFixed(2));
      } else {
        calculatedBmr = 10 * weight + 6.25 * height - 5 * age - 161;
        setBmr(calculatedBmr.toFixed(2));
      }
    }
  };

  useEffect(() => {
    if (weight && height && age && bmrFormulas[formula][gender]) {
      const calculatedBmr = bmrFormulas[formula][gender](weight, height, age);
      setBmr(calculatedBmr.toFixed(2));
    }
  }, [weight, height, age, gender, formula]);

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
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            value="Mifflin"
            checked={formula === "Mifflin"}
            onChange={(e) => setFormula(e.target.value)}
            className="mr-2"
          />
          Mifflin St Jeor
        </label>
        <label>
          <input
            type="radio"
            value="Harris"
            checked={formula === "Harris"}
            onChange={(e) => setFormula(e.target.value)}
            className="mr-2"
          />
          Revised Harris-Benedict
        </label>
      </div>
      {/* <button
        onClick={calculateBMR}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Calculate BMR
      </button> */}
      {bmr && (
        <div>
          <p>
            Your BMR is <span className="text-green-500">{bmr}</span>{" "}
            Calories/day
          </p>
        </div>
      )}
    </div>
  );
};

export default bmrCalculator;
