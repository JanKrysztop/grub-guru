import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import FoodDetails from "./FoodDetails";
import moment from "moment";
import Link from "next/link";
import NewProductModal from "../../ui/NewProductModal";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
//TODO: add API info to this component(watermark)
//Rename to nutritionTracker???
const CaloriesTracker = () => {
  const userData = useSelector(selectUserData);

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
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchConsumedFoods = async () => {
    if (!userData._id) return;
    setConsumedFoods([]);
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/daily-nutrients?userId=${userData._id}&date=${formattedDate}`
      );
      const fetchedFoods = response.data.foods || [];
      const fetchedWaterIntake = response.data.waterIntake || 0;
      setConsumedFoods(fetchedFoods);
      setWaterIntake(fetchedWaterIntake);
      setActiveIndex(Math.floor(fetchedWaterIntake / 200));
      // Calculate total nutrients for the day
      const totalNutrients = fetchedFoods.reduce(
        (total, food) => {
          return {
            calories: Math.floor(total.calories + food.energyNutrient),
            carbs: Math.floor(total.carbs + food.nutrients.CHOCDF),
            protein: Math.floor(total.protein + food.nutrients.PROCNT),
            fat: Math.floor(total.fat + food.nutrients.FAT),
          };
        },
        {
          calories: 0,
          carbs: 0,
          protein: 0,
          fat: 0,
        }
      );
      setDailyNutrients(totalNutrients);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConsumedFoods();
  }, [date, userData._id]);

  const saveConsumedFoods = async (foods) => {
    try {
      const payload = {
        userId: userData._id,
        date: date,
        foods: foods,
        waterIntake: waterIntake,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/track-nutrition`,
        payload
      );
    } catch (error) {
      console.log(error);
    }
  };

  //TODO: is this the best way to do this???
  useEffect(() => {
    saveConsumedFoods();
  }, [waterIntake]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/api/food-search?food=${food}`
      );

      // Map and transform the general food search results.
      const generalFoodList = response.data.hints.map((item) => {
        const energyNutrient = item.food.nutrients.ENERC_KCAL;
        return {
          ...item.food,
          energyNutrient,
          isCustom: false,
        };
      });

      const customFoodResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/custom-food/${userData._id}`
      );
      console.log(customFoodResponse);

      // Filter custom foods based on the search term.
      const matchingCustomFoods = customFoodResponse.data
        .filter((customItem) =>
          customItem.label.toLowerCase().includes(food.toLowerCase())
        )
        .map((item) => ({
          ...item,
          isCustom: true, // add the isCustom flag for custom items
        }));

      // Combine and prioritize the custom foods.
      const combinedList = [...matchingCustomFoods, ...generalFoodList];
      console.log(combinedList);
      setFoodList(combinedList);
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
    const newConsumedFoods = [...consumedFoods, { ...food, servingSize }];
    setConsumedFoods(newConsumedFoods);
    setFood("");
    setFoodList([]);
    setFoodDetails(null);
    saveConsumedFoods(newConsumedFoods);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    fetchConsumedFoods(selectedDate);
    // code to update dailyNutrients based on the selected date
  };

  const showNewProductModal = () => {
    setIsNewProductModalOpen(true);
  };
  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false);
  };

  const handleIconClick = (index) => {
    console.log(waterIntake, activeIndex);
    if (index === activeIndex) {
      setWaterIntake(waterIntake + 200);
      setActiveIndex(index + 1);
    } else if (index === activeIndex - 1) {
      setWaterIntake(waterIntake - 200);
      setActiveIndex(index);
    }
  };
  return (
    <>
      <div className="flex flex-col px-10 py-10 items-end justify-center bg-gray-100">
        <button
          onClick={showNewProductModal}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add new product
        </button>
        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={closeNewProductModal}
        />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-6 text-3xl font-bold text-gray-700">
          Calories Tracker
        </h1>
        {/* <button
          type="button"
          onClick={saveConsumedFoods}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Save
        </button> */}
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
          <FoodDetails
            food={foodDetails}
            foodList={foodList}
            setFoodDetails={setFoodDetails}
            setFoodList={setFoodList}
            onAdd={handleAdd}
          />
        ) : (
          foodList.length > 0 && (
            <div className="mt-4 border rounded shadow p-4 h-96 overflow-auto">
              <ul>
                {foodList.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item)}
                    className={
                      item.isCustom
                        ? "cursor-pointer bg-green-200 p-2 rounded"
                        : "cursor-pointer hover:bg-gray-200 p-2 rounded"
                    }
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
        <div className="mt-6 text-2xl text-gray-700">{waterIntake}/2800 ml</div>
        <div className="grid gap-2 grid-cols-7 grid-rows-2 mt-4">
          {Array.from({ length: 14 }).map((_, index) => (
            <button
              type="button"
              key={index}
              className="relative"
              onClick={() => handleIconClick(index)}
            >
              <img
                className={`w-14 ${
                  index < activeIndex ? "opacity-100" : "opacity-25"
                }`}
                src={`/water.svg`}
                alt="Water Icon"
              />
              {index === activeIndex && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <span className="text-white text-xl">+</span>
                </div>
              )}
              {index === activeIndex - 1 && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <span className="text-white text-xl">-</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CaloriesTracker;
