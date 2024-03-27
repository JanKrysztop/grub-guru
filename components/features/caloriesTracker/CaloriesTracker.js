import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format, startOfMonth, endOfMonth, getMonth, getYear } from "date-fns";
import MealList from "./MealList";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
import Calendar from "../Calendar";
import CustomProductForm from "../../forms/CustomProductForm";
import { Box, Typography, IconButton } from "@mui/joy";
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
import { LinearProgress } from "@mui/joy";
import useThemeSettings from "@/hooks/useThemeSettings";
//Rename to nutritionTracker???
const CaloriesTracker = () => {
  const userData = useSelector(selectUserData);
  const { mode, setMode } = useColorScheme();
  const { backgroundColor } = useThemeSettings();
  const [dailyNutrients, setDailyNutrients] = useState({
    kcal: 0,
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
  const [waterConsumption, setWaterConsumption] = useState(0);
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
  const objectsAreEqual = (obj1, obj2) => {
    if (obj1 == null || obj2 == null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        (areObjects && !objectsAreEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  };

  const isObject = (object) => {
    return object != null && typeof object === "object";
  };
  const fetchConsumedFoods = async () => {
    if (!userData?._id) return;
    // setConsumedFoods([]);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/daily-nutrients?userId=${userData._id}&date=${formattedDate}`
      );
      const { meals, waterConsumption: fetchedWaterConsumption } =
        response.data;
      if (!meals) {
        setConsumedFoods({
          breakfast: [],
          secondBreakfast: [],
          lunch: [],
          snack: [],
          dinner: [],
        });
      } else if (!objectsAreEqual(meals, consumedFoods)) {
        setConsumedFoods(meals);
      }
      console.log("Consumed foods", consumedFoods, fetchedWaterConsumption);
      if (fetchedWaterConsumption !== waterConsumption) {
        setWaterConsumption(fetchedWaterConsumption || 0);
        setActiveIndex(Math.floor(fetchedWaterConsumption / 200) || 0);
      }
      // Calculate total nutrients for the day
      let totalNutrients = { kcal: 0, carbs: 0, protein: 0, fat: 0 };
      Object.values(meals || {}).forEach((meal) => {
        meal.forEach((food) => {
          totalNutrients.kcal += food.kcal;
          totalNutrients.carbs += food.carbs;
          totalNutrients.protein += food.protein;
          totalNutrients.fat += food.fat;
        });
      });
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
        waterConsumption: waterConsumption,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/track-nutrition`,
        payload
      );
      console.log("Food saved", response.data);
      setEntries((currentEntries) => [...currentEntries, response.data]);
      fetchConsumedFoods();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveConsumedFoods();
  }, [waterConsumption]);

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
    console.log(waterConsumption, activeIndex);
    if (index === activeIndex) {
      setWaterConsumption(waterConsumption + 200);
      setActiveIndex(index + 1);
    } else if (index === activeIndex - 1) {
      setWaterConsumption(waterConsumption - 200);
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
          // alignItems: "center",
          width: "100%",
          maxWidth: "sm",
          // p: 1,
          m: 1,
          mb: 10,
        }}
      >
        <CustomButton
          onClick={() => setShowNewProduct(true)}
          styleType="secondary"
          sx={{ mr: 1, width: "160px", alignSelf: "end" }}
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
          showSelectFood={showSelectFood}
          setShowSelectFood={setShowSelectFood}
          setSnackbar={setSnackbar}
          saveConsumedFoods={saveConsumedFoods}
          userId={userData?._id}
          date={date}
          fetchConsumedFoods={fetchConsumedFoods}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%)", // Centers the element
            width: "100%",
            maxWidth: "sm",
            display: "flex",
            gap: 1,

            zIndex: 1000,
            bgcolor: backgroundColor,
            p: 2,
          }}
        >
          <Box sx={{ width: "100%", minWidth: "140px" }}>
            <Typography noWrap marginBottom={1}>
              Kcal {dailyNutrients.kcal}/{userData?.recommendedCalories}
            </Typography>
            <LinearProgress
              value={
                (dailyNutrients.kcal / userData?.recommendedCalories) * 100
              }
              determinate
              variant="solid"
              size="lg"
              sx={{
                color:
                  dailyNutrients.kcal > userData?.recommendedCalories
                    ? "red"
                    : "#C2016D",
                "--LinearProgress-progressThickness": "14px",

                "--LinearProgress-thickness": "14px",
              }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Protein</Typography>
            <Box
              sx={{
                textAlign: "center",
                width: "100%",

                bgcolor: "#E78B01",
                borderRadius: "5px",
              }}
            >
              <Typography sx={{ color: "#FAFAFA" }}>
                {dailyNutrients.protein}g
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Fat</Typography>
            <Box
              sx={{
                textAlign: "center",
                width: "100%",

                bgcolor: "#0165C2",
                borderRadius: "5px",
              }}
            >
              <Typography sx={{ color: "#FAFAFA" }}>
                {dailyNutrients.fat}g
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography>Carbs</Typography>
            <Box
              sx={{
                textAlign: "center",
                width: "100%",

                bgcolor: "#6DC201",
                borderRadius: "5px",
              }}
            >
              <Typography sx={{ color: "#FAFAFA" }}>
                {dailyNutrients.carbs}g
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography level="h4" sx={{ ml: 1, textAlign: "left" }}>
          Fluids {waterConsumption}/2800 ml
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
            p: 1,
          }}
        >
          {Array.from({ length: 14 }).map((_, index) => (
            <IconButton
              key={index}
              onClick={() => handleIconClick(index)}
              sx={{
                position: "relative",
                opacity: index < activeIndex ? 1 : 0.3,
                "&:hover": { opacity: 1 },
                width: "50px",
              }}
            >
              <img src={`/water.svg`} alt="Water Icon" />

              {index === activeIndex && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography level="h4" sx={{ color: "#292B29" }}>
                    +
                  </Typography>
                </Box>
              )}
              {index === activeIndex - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography level="h4" sx={{ color: "#292B29" }}>
                    -
                  </Typography>
                </Box>
              )}
            </IconButton>
          ))}
        </Box>
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
