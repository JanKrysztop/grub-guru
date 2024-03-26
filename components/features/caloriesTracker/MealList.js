import React from "react";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  ListItemButton,
  Sheet,
  Divider,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
} from "@mui/joy";
import { useState } from "react";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import FoodDetails from "./FoodDetails";
import DeleteMenu from "@/components/ui/DeleteMenu";

const MealList = ({
  mealTypes,
  consumedFoods,
  mode,
  showSelectFood,
  setShowSelectFood,
  setSnackbar,
  saveConsumedFoods,
  userId,
  date,
  fetchConsumedFoods,
}) => {
  const [mealIndex, setMealIndex] = useState(null);
  const [activeDeleteMenu, setActiveDeleteMenu] = useState({
    mealType: null,
    index: null,
  });
  const selectMeal = (index) => {
    setMealIndex(index);
    setShowSelectFood(true);
  };
  const setShowDeleteMenu = (show, mealType, index) => {
    if (show) {
      setActiveDeleteMenu({ mealType, index });
    } else {
      setActiveDeleteMenu({ mealType: null, index: null }); // No menu is active
    }
  };
  const formatMealName = (name) => {
    const spacedName = name?.replace(/([A-Z])/g, " $1").toLowerCase();
    return spacedName
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const deleteFood = async (userId, date, mealType, foodId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/nutrition/delete-food`,
        {
          data: {
            userId,
            date,
            mealType,
            foodId,
          },
        }
      );
      console.log("Food item deleted successfully:", response.data);
      fetchConsumedFoods();
      setActiveDeleteMenu(false);
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "8px",
        p: 1,
        mt: 2,
        mb: 10,
        backgroundColor:
          mode === "dark"
            ? "rgba(73, 75, 71, 0.5)"
            : "rgba(250, 250, 250, 0.5)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mealTypes.map((mealType, index) => (
          <Box
            key={mealType}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%", // Ensure the header spans the full width
                paddingTop: 1,
              }}
            >
              <Typography level="h4" sx={{ textTransform: "capitalize" }}>
                {formatMealName(mealType)}
              </Typography>
              <IconButton
                size="lg"
                variant="plain"
                onClick={() => selectMeal(index)}
                sx={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: mode === "dark" && "#6A6D69",
                  },
                }}
              >
                <AddCircleOutlineRounded
                  sx={{ width: "100%", height: "100%", color: "#6DC201" }}
                />
              </IconButton>
            </Box>
            <List
              sx={{
                width: "100%", // Adjust width as needed

                // bgcolor: mode === "dark" && "#494b47", // Adjust background color as needed
              }}
            >
              {consumedFoods[mealType].map((foodItem, index) => (
                <ListItem
                  key={index}
                  // endAction={
                  //   <Box sx={{ zIndex: 1000, position: "relative" }}>
                  //     <DeleteMenu
                  //       show={
                  //         activeDeleteMenu.index === index &&
                  //         activeDeleteMenu.mealType === mealType
                  //       }
                  //       setShow={(show) =>
                  //         setShowDeleteMenu(show, mealType, index)
                  //       }
                  //       handleDelete={deleteFood}
                  //       mode={mode}
                  //     />
                  //   </Box>
                  // }
                >
                  <ListItemContent>
                    <Typography level="title-sm">{foodItem.label}</Typography>
                    <Typography level="body-sm">
                      {" "}
                      {`${foodItem.kcal} kcal`}
                    </Typography>
                  </ListItemContent>
                  <Box sx={{ zIndex: 1000, position: "relative" }}>
                    <DeleteMenu
                      show={
                        activeDeleteMenu.index === index &&
                        activeDeleteMenu.mealType === mealType
                      }
                      setShow={(show) =>
                        setShowDeleteMenu(show, mealType, index)
                      }
                      handleDelete={() =>
                        deleteFood(userId, date, mealType, foodItem._id)
                      }
                      mode={mode}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        ))}
        <Modal
          open={showSelectFood}
          onClose={() => setShowSelectFood(false)}
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
            <DialogTitle level="h4" sx={{ textTransform: "capitalize" }}>
              {formatMealName(mealTypes[mealIndex])}
            </DialogTitle>
            <DialogContent>
              <FoodDetails
                mode={mode}
                setSnackbar={setSnackbar}
                saveConsumedFoods={saveConsumedFoods}
                setShowSelectFood={setShowSelectFood}
                mealType={mealTypes[mealIndex]}
              />
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Box>
    </Box>
  );
};

export default MealList;
