import { useState } from "react";
import axios from "axios";

const CaloriesTracker = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/api/food-search?food=${food}`
      );
      console.log(response.data);
      //   const foodData = response.data.foods[0];
      //   setCalories(foodData.nutrients[0].amount); // assuming the first nutrient is calories
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">
        Calories Tracker
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter food item"
          className="px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Get Calories
        </button>
      </form>
      <p className="mt-6 text-2xl text-gray-700">{calories} calories</p>
    </div>
  );
};

export default CaloriesTracker;
