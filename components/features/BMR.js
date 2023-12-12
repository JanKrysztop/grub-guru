import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBmrFormulas } from "@/redux/bmrSlice";

const BmrCalculator = () => {
  const bmrFormulas = useSelector(selectBmrFormulas);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmr, setBmr] = useState(null);
  const [formula, setFormula] = useState("Harris");

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

export default BmrCalculator;
