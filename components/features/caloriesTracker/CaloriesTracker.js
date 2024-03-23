import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Calendar from "react-calendar";
// import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import FoodDetails from "./FoodDetails";
import moment from "moment";
import { format, startOfMonth, endOfMonth, getMonth, getYear } from "date-fns";
import MealList from "./MealList";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
import Calendar from "../Calendar";
import CustomProductForm from "../../forms/CustomProductForm";
import {
  Box,
  Button,
  Sheet,
  Card,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/joy";
import CustomButton from "@/components/ui/CustomButton";
import { ShoppingBasketRounded } from "@mui/icons-material";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import { Snackbar } from "@mui/joy";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import { useColorScheme } from "@mui/joy/styles";
import { AddCircleOutlineRounded } from "@mui/icons-material";
//Rename to nutritionTracker???
const CaloriesTracker = () => {
  const userData = useSelector(selectUserData);
  const { mode, setMode } = useColorScheme();

  const [dailyNutrients, setDailyNutrients] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
  });

  // const [consumedFoods, setConsumedFoods] = useState([]);
  const [consumedFoods, setConsumedFoods] = useState({
    breakfast: [],
    secondBreakfast: [],
    lunch: [],
    snack: [],
    dinner: [],
  });
  const [date, setDate] = useState(new Date());
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entries, setEntries] = useState([]);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [showSelectFood, setShowSelectFood] = useState(false);
  const prevDateRef = useRef();
  const mealTypes = Object.keys(consumedFoods);
  const fetchConsumedFoods = async () => {
    if (!userData?._id) return;
    setConsumedFoods([]);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/daily-nutrients?userId=${userData._id}&date=${formattedDate}`
      );
      const { meals, waterIntake } = response.data;
      setConsumedFoods(
        meals || {
          breakfast: [],
          secondBreakfast: [],
          lunch: [],
          snack: [],
          dinner: [],
        }
      );
      setWaterIntake(waterIntake || 0);
      setActiveIndex(Math.floor(waterIntake / 200));
      // Calculate total nutrients for the day
      // const totalNutrients = fetchedFoods.reduce(
      //   (total, food) => {
      //     return {
      //       calories: Math.floor(total.calories + food.energyNutrient),
      //       carbs: Math.floor(total.carbs + food.nutrients.CHOCDF),
      //       protein: Math.floor(total.protein + food.nutrients.PROCNT),
      //       fat: Math.floor(total.fat + food.nutrients.FAT),
      //     };
      //   },
      //   {
      //     calories: 0,
      //     carbs: 0,
      //     protein: 0,
      //     fat: 0,
      //   }
      // );
      setDailyNutrients(totalNutrients);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMonthEntries = async () => {
    if (!userData?._id) return;

    try {
      // Assuming 'date' is the date object for the current month you're interested in
      // Calculate the start and end of the month for 'date'
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      // Format startDate and endDate to YYYY-MM-DD format for the API call
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/nutrients-range?userId=${userData._id}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      !prevDateRef.current ||
      getMonth(prevDateRef.current) !== getMonth(date) ||
      getYear(prevDateRef.current) !== getYear(date)
    ) {
      fetchMonthEntries();
    }
    prevDateRef.current = date;
  }, [date, userData?._id]);

  useEffect(() => {
    fetchConsumedFoods();
  }, [date, userData?._id]);

  const saveConsumedFoods = async (food, foodLabel, mealType) => {
    console.log("Food", food, "Meal type", mealType);
    try {
      const payload = {
        userId: userData._id,
        date: date,
        food: food,
        foodLabel: foodLabel,
        mealType: mealType,
        waterIntake: waterIntake,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/track-nutrition`,
        payload
      );
      console.log("Food saved", response.data);
      setEntries((currentEntries) => [...currentEntries, response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  // const saveConsumedFoods = async (food, foodLabel, mealType) => {
  //   console.log("FOod", food, "Meal type", mealType);
  //   try {
  //     const foodWithLabel = {
  //       ...food,
  //       label: foodLabel, // Add the label to the food object
  //     };
  //     const meals = {
  //       breakfast: [],
  //       lunch: [],
  //       dinner: [],
  //       snack: [],
  //       secondBreakfast: [], // Add or remove meal types as necessary
  //     };
  //     if (meals.hasOwnProperty(mealType)) {
  //       meals[mealType].push(foodWithLabel); // Add `food` to the appropriate meal type array
  //     } else {
  //       console.error(`Invalid meal type: ${mealType}`);
  //       return; // Exit the function if `mealType` is invalid
  //     }
  //     const payload = {
  //       userId: userData._id,
  //       date: date,
  //       meals: meals,
  //       waterIntake: waterIntake,
  //     };

  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/track-nutrition`,
  //       payload
  //     );
  //     console.log("Food saved", response.data);
  //     // Assuming your backend returns the saved entry, including it in the current entries
  //     setEntries((currentEntries) => [...currentEntries, response.data]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const saveConsumedFoods = async (foods) => {
  //   try {
  //     const payload = {
  //       userId: userData._id,
  //       date: date,
  //       foods: foods,
  //       waterIntake: waterIntake,
  //     };
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/track-nutrition`,
  //       payload
  //     );
  //     setEntries((currentEntries) => [...currentEntries, response.data]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   saveConsumedFoods();
  // }, [waterIntake]);

  const handleAdd = (food, servingSize, mealType) => {
    setDailyNutrients((prevNutrients) => ({
      calories: Math.floor(prevNutrients.calories + food.energyNutrient),
      carbs: Math.floor(prevNutrients.carbs + food.nutrients.CHOCDF),
      protein: Math.floor(prevNutrients.protein + food.nutrients.PROCNT),
      fat: Math.floor(prevNutrients.fat + food.nutrients.FAT),
    }));
    setConsumedFoods((prevFoods) => ({
      ...prevFoods,
      [mealType]: [...prevFoods[mealType], { ...food, servingSize }],
    }));
    // setFood("");
    // setFoodList([]);
    // setFoodDetails(null);
    saveConsumedFoods({ ...food, servingSize }, mealType);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {" "}
      <Calendar
        handleDateChange={handleDateChange}
        date={date}
        entries={entries}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "sm",
          // p: 1,
          m: 1,
        }}
      >
        {/* <button
          onClick={showNewProductModal}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Add new product
        </button>
        <Button color="neutral">
          <ShoppingBasketRounded /> New product
        </Button> */}
        <CustomButton
          onClick={() => setShowNewProduct(true)}
          styleType="secondary"
          sx={{ width: "160px", alignSelf: "end" }}
        >
          {" "}
          <ShoppingBasketRounded sx={{ marginRight: "4px" }} /> New product
        </CustomButton>
        <Modal
          open={showNewProduct}
          onClose={() => setShowNewProduct(false)}
          size="lg"
          variant="soft"
        >
          <ModalDialog
            size="lg"
            sx={{
              width: "100%",
              maxWidth: "600px",
              // height: "70vh",
              maxHeight: "800px",
              backgroundColor: mode === "dark" && "#292B29",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <DialogTitle>Add new product</DialogTitle>
            <DialogContent>
              <CustomProductForm
                snackbar={snackbar}
                setSnackbar={setSnackbar}
                setShowNewProduct={setShowNewProduct}
              />
            </DialogContent>
          </ModalDialog>
        </Modal>
        <MealList
          mealTypes={mealTypes}
          consumedFoods={consumedFoods}
          mode={mode}
          handleAdd={handleAdd}
          showSelectFood={showSelectFood}
          setShowSelectFood={setShowSelectFood}
          setSnackbar={setSnackbar}
          saveConsumedFoods={saveConsumedFoods}
        />
        {/*
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
        </div> */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={4000}
          open={snackbar.open}
          variant="solid"
          color={
            snackbar.open && snackbar.type === "success"
              ? "success"
              : snackbar.open
              ? "danger"
              : undefined
          }
          size="lg"
          onClose={() => {
            setSnackbar((prevState) => ({ ...prevState, open: false }));
          }}
        >
          {snackbar.type === "success" ? <CheckCircle /> : <InfoIcon />}
          {snackbar.message}
        </Snackbar>
      </Box>
    </Box>
  );
};

export default CaloriesTracker;
