import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
import DeleteMenu from "../../ui/DeleteMenu";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
  SvgIcon,
  AspectRatio,
  Card,
} from "@mui/joy";
import { ArrowCircleRightRounded } from "@mui/icons-material";
import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { VerifiedRounded } from "@mui/icons-material";
import { ImageNotSupportedRounded } from "@mui/icons-material";
import { DeleteRounded } from "@mui/icons-material";
const FoodDetails = ({ saveConsumedFoods, mode, setSnackbar, mealType }) => {
  const userData = useSelector(selectUserData);
  const [food, setFood] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [foodDetails, setFoodDetails] = useState(null);
  const [selectedServingSize, setSelectedServingSize] = useState(
    food?.servingSizes?.[0]
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [servingSize, setServingSize] = useState(null);
  const [displayedNutrients, setDisplayedNutrients] = useState({
    kcal: foodDetails?.energyNutrient,
    protein: foodDetails?.nutrients.PROCNT,
    fat: foodDetails?.nutrients.FAT,
    carbs: foodDetails?.nutrients.CHOCDF,
  });
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  useEffect(() => {
    setServingSize(foodDetails?.servingSize || 100);
  }, [foodDetails]);

  useEffect(() => {
    let nutrientsPerGram = {};
    if (foodDetails?.isCustom) {
      // For custom foods, calculate nutrients based on the custom servingSize
      nutrientsPerGram.kcal =
        foodDetails?.energyNutrient / foodDetails?.servingSize;
      nutrientsPerGram.protein =
        foodDetails?.nutrients.PROCNT / foodDetails?.servingSize;
      nutrientsPerGram.fat =
        foodDetails?.nutrients.FAT / foodDetails?.servingSize;
      nutrientsPerGram.carbs =
        foodDetails?.nutrients.CHOCDF / foodDetails?.servingSize;
    } else {
      // For default foods, calculate the nutrients based on a 100g serving size
      nutrientsPerGram.kcal = foodDetails?.energyNutrient / 100;
      nutrientsPerGram.protein = foodDetails?.nutrients.PROCNT / 100;
      nutrientsPerGram.fat = foodDetails?.nutrients.FAT / 100;
      nutrientsPerGram.carbs = foodDetails?.nutrients.CHOCDF / 100;
    }

    // Calculate displayed nutrients based on the input serving size
    setDisplayedNutrients({
      kcal: Math.round(nutrientsPerGram.kcal * servingSize),
      protein: Math.round(nutrientsPerGram.protein * servingSize),
      fat: Math.round(nutrientsPerGram.fat * servingSize),
      carbs: Math.round(nutrientsPerGram.carbs * servingSize),
    });
  }, [servingSize, foodDetails]);

  const handleFoodSearch = async (e) => {
    e.preventDefault();
    setFoodDetails(null);
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
  const handleServingSizeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 9) {
      setServingSize(value);
    }
  };

  const handleAddClick = () => {
    onAdd(food, selectedServingSize);
  };
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteCustomProduct = (id) => async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/custom-food/${id}`
      );
      if (response.status === 200) {
        const updatedFoods = foodList.filter((foodItem) => foodItem._id !== id);
        setFoodDetails(null);
        setFoodList(updatedFoods);
      }
      setShowDeleteMenu(false);
      setSnackbar({
        open: true,
        type: "success",
        message: "Product deleted successfully!",
      });
      food;
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to create delete product. Please try again.",
      });
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomInput
          type="text"
          id="label"
          name="label"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter meal item"
        />
        <IconButton
          size="lg"
          variant="plain"
          onClick={handleFoodSearch}
          sx={{
            width: "80px",
            height: "80px",
            flexShrink: 0,
            flexGrow: 0,
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: mode === "dark" && "#6A6D69",
            },
          }}
        >
          <ArrowCircleRightRounded
            sx={{ width: "100%", height: "100%", color: "#6DC201" }}
          />
        </IconButton>
      </Box>
      {foodDetails ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            {foodDetails.isCustom && (
              <DeleteMenu
                show={showDeleteMenu}
                setShow={setShowDeleteMenu}
                handleDelete={deleteCustomProduct(foodDetails._id)}
                mode={mode}
                icon={<DeleteRounded />}
              />
            )}
            {foodDetails.image ? (
              <AspectRatio
                ratio="1"
                objectFit="contain"
                sx={{ width: 200, mb: 2 }}
              >
                <img src={foodDetails.image} alt={foodDetails.label} />
              </AspectRatio>
            ) : (
              <AspectRatio ratio="1" sx={{ width: 200, mb: 2 }}>
                <div>
                  <ImageNotSupportedRounded
                    sx={{ fontSize: "110px", opacity: 0.2 }}
                  />
                </div>
              </AspectRatio>
            )}
          </Box>
          <Typography level="title-lg" sx={{ mb: 1 }}>
            {foodDetails.label}
          </Typography>
          {foodDetails.brand && (
            <Typography level="body-lg" sx={{ mb: 1 }}>
              Brand: {foodDetails.brand}
            </Typography>
          )}
          {foodDetails.category && (
            <Typography level="body-lg" sx={{ mb: 1 }}>
              Category: {foodDetails.category}
            </Typography>
          )}
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <Typography
              level="body-lg"
              sx={{ mr: 5, flexShrink: 0, flexGrow: 0 }}
            >
              Serving Size:
            </Typography>
            <CustomInput
              type="number"
              value={servingSize}
              onChange={handleServingSizeChange}
            />
            <Typography
              level="body-lg"
              sx={{ ml: 3, flexShrink: 0, flexGrow: 0 }}
            >
              grams
            </Typography>
          </Box>
          <Typography level="title-lg" sx={{ mt: 3, mb: 1 }}>
            Calories {displayedNutrients.kcal}
          </Typography>
          <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
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
                  {displayedNutrients.protein}g
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
                  {displayedNutrients.fat}g
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
                  {displayedNutrients.carbs}g
                </Typography>
              </Box>
            </Box>
          </Box>
          <CustomButton
            onClick={() =>
              saveConsumedFoods(displayedNutrients, foodDetails.label, mealType)
            }
          >
            Add
          </CustomButton>
          {!foodDetails?.isCustom && (
            <Box
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <img width={200} src={`/edamam-badge.svg`} alt="Badge Icon" />
            </Box>
          )}
        </Box>
      ) : (
        foodList.length > 0 && (
          <Box
            className="mt-4"
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: "sm",
              boxShadow: "md",
              p: 2,
              height: "50vh",
              overflow: "auto",
            }}
          >
            <List>
              {foodList.map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() => setFoodDetails(item)}
                  sx={{
                    cursor: "pointer",

                    "&:hover": {
                      bgcolor: mode === "dark" ? "#6A6D69" : "#DBE2DD",
                    },
                    p: 2,
                    borderRadius: "md",
                  }}
                >
                  {item.label}
                  {item.isCustom && (
                    <VerifiedRounded sx={{ color: "#6DC201" }} />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        )
      )}
    </Box>
  );
};

export default FoodDetails;
