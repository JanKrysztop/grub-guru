import { useState } from "react";

const WhrCalculator = () => {
  const [gender, setGender] = useState("female");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [whr, setWhr] = useState(null);
  const [whrCategory, setWhrCategory] = useState("");
  const [icon, setIcon] = useState("");

  const calculateWHR = () => {
    const calculatedWhr = (waist / hip).toFixed(2);
    setWhr(calculatedWhr);

    if (gender === "female") {
      if (whr < 0.8) {
        setWhrCategory("low health risk");
        setIcon("pear");
      } else {
        setWhrCategory("high tisk");
        setIcon("apple");
      }
    } else {
      if (whr < 1) {
        setWhrCategory("low health risk");
        setIcon("pear");
      } else {
        setWhrCategory("high health risk");
        setIcon("apple");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <input
        type="number"
        placeholder="Waist in cm"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
        className="px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
      <input
        type="number"
        placeholder="Hip in cm"
        value={hip}
        onChange={(e) => setHip(e.target.value)}
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
        onClick={calculateWHR}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Calculate WHR
      </button>
      {whr && (
        <div>
          <p>Your WHR is {whr}</p>
          <p>Your WHR category is {whrCategory}</p>
          <p>Body shape: {icon}</p>
          <img src={`/${icon}.svg`} alt="Shape Icon" />
        </div>
      )}
    </div>
  );
};

export default WhrCalculator;
