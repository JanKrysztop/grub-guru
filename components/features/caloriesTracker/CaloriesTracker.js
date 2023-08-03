import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import FoodDetails from "./FoodDetails";
//TODO: add API info to this component(watermark)
//Rename to nutritionTracker???
const CaloriesTracker = () => {
  const [food, setFood] = useState("");
  const [dailyNutrients, setDailyNutrients] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });
  const [foodList, setFoodList] = useState([]);
  const [foodDetails, setFoodDetails] = useState(null);
  const [consumedFoods, setConsumedFoods] = useState([]);
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/me`, {
          withCredentials: true,
        });
        console.log("User ID:", response.data); // Adjust depending on how the data is structured in the response
        setUserId(response.data.userId);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, []);

  const fetchConsumedFoods = async (selectedDate) => {
    if (!userId) return; // Skip the request if userId is not yet defined

    try {
      const response = await axios.get(
        `http://localhost:3001/nutrition/daily-nutrients?userId=${userId}&date=${selectedDate}`
      );
      setConsumedFoods(response.data.foods || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConsumedFoods(date);
  }, [date, userId]);

  const saveConsumedFoods = async () => {
    try {
      const payload = {
        userId: userId,
        date: date,
        foods: consumedFoods,
      };
      await axios.post(
        `http://localhost:3001/nutrition/track-nutrition`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3001/api/food-search?food=${food}`
      );
      console.log(response.data);

      const foodList = response.data.hints.map((item) => {
        const energyNutrient = item.food.nutrients.ENERC_KCAL;

        return {
          ...item.food,
          energyNutrient,
        };
      });
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
      calories: Math.floor(prevNutrients.calories + food.energyNutrient),
      carbs: Math.floor(prevNutrients.carbs + food.nutrients.CHOCDF),
      protein: Math.floor(prevNutrients.protein + food.nutrients.PROCNT),
      fat: Math.floor(prevNutrients.fat + food.nutrients.FAT),
    }));
    setConsumedFoods((prev) => [...prev, { ...food, servingSize }]);
    setFood("");
    setFoodList([]);
    setFoodDetails(null);
    saveConsumedFoods();
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    fetchConsumedFoods(selectedDate);
    // code to update dailyNutrients based on the selected date
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-6 text-3xl font-bold text-gray-700">
          Calories Tracker
        </h1>
        <DatePicker onChange={handleDateChange} value={date} />
        {!foodDetails && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="Enter food item"
              className="px-3 py-2 my-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
          <FoodDetails food={foodDetails} onAdd={handleAdd} />
        ) : (
          foodList.length > 0 && (
            <div className="mt-4 border rounded shadow p-4 h-96 overflow-auto">
              <ul>
                {foodList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item)}
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
                  {item.label} - {item.energyNutrient} kcal
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CaloriesTracker;