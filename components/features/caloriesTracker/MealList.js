import React from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
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

const MealList = ({
  mealTypes,
  consumedFoods,
  mode,
  handleAdd,
  showSelectFood,
  setShowSelectFood,
}) => {
  const [mealIndex, setMealIndex] = useState(null);

  const selectMeal = (index) => {
    setMealIndex(index);
    setShowSelectFood(true);
  };
  const formatMealName = (name) => {
    const spacedName = name?.replace(/([A-Z])/g, " $1").toLowerCase();
    return spacedName
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <Sheet
      sx={{
        width: "100%",
        borderRadius: "8px",
        p: 1,
        mt: 2,
        backgroundColor: mode === "dark" && "#494b47",
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
                bgcolor: mode === "dark" && "#494b47", // Adjust background color as needed
              }}
            >
              {consumedFoods[mealType].map((foodItem, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={foodItem.label}
                    secondary={`${foodItem.energyNutrient} kcal`}
                  />
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
              <FoodDetails mode={mode} />
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Box>
    </Sheet>
  );
};

export default MealList;
