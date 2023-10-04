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

const TdeeCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmr, setBmr] = useState(null);
  const [formula, setFormula] = useState("Harris");
  const [activity, setActivity] = useState(activityLevels[0].value);
  const [tdee, setTdee] = useState(null);

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

      // Calculate TDEE
      const calculatedTdee = calculatedBmr * activity;
      setTdee(calculatedTdee.toFixed(2));
    }
  }, [weight, height, age, gender, formula, activity]);

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
      <select value={activity} onChange={(e) => setActivity(e.target.value)}>
        {activityLevels.map((level) => (
          <option key={level.id} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
      {/* <button
        onClick={calculateBMR}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Calculate BMR
      </button> */}
      {tdee && (
        <div>
          <p>
            Your TDEE is <span className="text-green-500">{tdee}</span>{" "}
            Calories/day
          </p>
        </div>
      )}
    </div>
  );
};

export default TdeeCalculator;
