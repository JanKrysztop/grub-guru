import { useState } from "react";
import axios from "axios";

import FoodDetails from "./FoodDetails";
//TODO: add API info to this component
const CaloriesTracker = () => {
  const [food, setFood] = useState("");
  const [dailyNutrients, setDailyNutrients] =
    useState({
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
    });
  const [foodList, setFoodList] = useState([]);
  const [foodDetails, setFoodDetails] =
    useState(null);
  const [consumedFoods, setConsumedFoods] =
    useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/api/food-search?food=${food}`
      );
      console.log(response.data);

      const foodList = response.data.hints.map(
        (item) => {
          const energyNutrient =
            item.food.nutrients.ENERC_KCAL;

          return {
            ...item.food,
            energyNutrient,
          };
        }
      );
      setFoodList(foodList);
      console.log(foodList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (item) => {
    setFoodDetails(item);
  };

  const handleAdd = (food, servingSize) => {
    setDailyNutrients((prevNutrients) => ({
      calories: Math.floor(
        prevNutrients.calories +
          food.energyNutrient
      ),
      carbs: Math.floor(
        prevNutrients.carbs +
          food.nutrients.CHOCDF
      ),
      protein: Math.floor(
        prevNutrients.protein +
          food.nutrients.PROCNT
      ),
      fat: Math.floor(
        prevNutrients.fat + food.nutrients.FAT
      ),
    }));
    setConsumedFoods((prev) => [
      ...prev,
      { ...food, servingSize },
    ]);
    setFood("");
    setFoodList([]);
    setFoodDetails(null);
  };

  const handleNutrientCount = (item) => {
    const calories = item.energyNutrient
      ? item.energyNutrient
      : 0;
    setCalories(
      (prevCalories) => prevCalories + calories
    );
    setConsumedFoods([...consumedFoods, item]);
    setFood("");
    setFoodList([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">
        Calories Tracker
      </h1>
      {!foodDetails && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            value={food}
            onChange={(e) =>
              setFood(e.target.value)
            }
            placeholder="Enter food item"
            className="px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Search Food
          </button>
        </form>
      )}
      {foodDetails ? (
        <FoodDetails
          food={foodDetails}
          onAdd={handleAdd}
        />
      ) : (
        foodList.length > 0 && (
          <div className="mt-4 border rounded shadow p-4 h-96 overflow-auto">
            <ul>
              {foodList.map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    handleSelect(item)
                  }
                  className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
      <div className="flex gap-5">
        <p className="mt-6 text-2xl text-gray-700">
          {dailyNutrients.calories} calories
        </p>
        <p className="mt-6 text-2xl text-gray-700">
          {dailyNutrients.carbs} carbs
        </p>{" "}
        <p className="mt-6 text-2xl text-gray-700">
          {dailyNutrients.protein} protein
        </p>{" "}
        <p className="mt-6 text-2xl text-gray-700">
          {dailyNutrients.fat} fat
        </p>
      </div>
      {consumedFoods.length > 0 && (
        <div className="mt-4 border rounded shadow p-4 overflow-auto">
          <ul>
            {consumedFoods.map((item, index) => (
              <li key={index}>
                {item.label} -{" "}
                {item.energyNutrient} kcal
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CaloriesTracker;
