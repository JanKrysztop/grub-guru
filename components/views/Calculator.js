import BMI from "../features/BMI";
import WHR from "../features/WHR";
import BMR from "../features/BMR";
import TDEE from "../features/TDEE";

import { useState } from "react";

const Calculator = () => {
  const [currentCalculator, setCurrentCalculator] = useState("BMI");

  const renderCalculator = () => {
    switch (currentCalculator) {
      case "BMI":
        return <BMI />;
      case "WHR":
        return <WHR />;
      case "TDEE":
        return <TDEE />;
      case "BMR":
        return <BMR />;
      default:
        return "BMI";
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="flex space-x-4 my-8">
        <button
          onClick={() => setCurrentCalculator("BMI")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          BMI
        </button>
        <button
          onClick={() => setCurrentCalculator("WHR")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          WHR
        </button>
        <button
          onClick={() => setCurrentCalculator("BMR")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          BMR
        </button>
        <button
          onClick={() => setCurrentCalculator("TDEE")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          TDEE
        </button>
      </div>
      {renderCalculator()}
    </div>
  );
};

export default Calculator;
