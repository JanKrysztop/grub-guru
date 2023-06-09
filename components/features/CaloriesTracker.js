import { useState } from "react";
import axios from "axios";
//TODO: use foodMeasures if servingSize is not available or create seconf step for each product to specify servingSize, add error if no item was found in search
const CaloriesTracker = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [consumedFoods, setConsumedFoods] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/api/food-search?food=${food}`
      );
      console.log(response.data);
      //TODO: add data from all pages??

      const foodList = response.data.foods.map((item) => {
        const energyNutrient = item.foodNutrients.find(
          (nutrient) => nutrient.nutrientName === "Energy"
        );

        return {
          ...item,
          energyNutrient,
        };
      });
      setFoodList(foodList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (item) => {
    const calories = item.energyNutrient ? item.energyNutrient.value : 0;
    setCalories((prevCalories) => prevCalories + calories);
    setConsumedFoods([...consumedFoods, item]);
    setFood("");
    setFoodList([]);
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
          Search Food
        </button>
      </form>
      {foodList.length > 0 ? (
        <div className="mt-4 border rounded shadow p-4 h-96 overflow-auto">
          <ul>
            {foodList.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded"
              >
                {item.description} -{" "}
                {item.energyNutrient ? item.energyNutrient.value : "N/A"} kcal -
                per {item.servingSize} {item.servingSizeUnit}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-6 text-2xl text-gray-700">{calories} calories</p>
      {consumedFoods.length > 0 ? (
        <div className="mt-4 border rounded shadow p-4  overflow-auto">
          <ul>
            {consumedFoods.map((item, index) => (
              <li key={index}>
                {item.description} -{" "}
                {item.energyNutrient ? item.energyNutrient.value : "N/A"} kcal -
                per {item.servingSize} {item.servingSizeUnit}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CaloriesTracker;
