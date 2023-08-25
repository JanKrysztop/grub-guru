const express = require("express");
const router = express.Router();
const CustomFood = require("../models/CustomFood");

// Create a new custom food
router.post("/add", async (req, res) => {
  const { userId, label, energyNutrient, nutrients, servingSize } = req.body;

  if (!userId || !label || !energyNutrient) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  try {
    const newFood = new CustomFood({
      userId,
      label,
      energyNutrient,
      nutrients,
      servingSize,
    });
    const savedFood = await newFood.save();
    res.json(savedFood);
  } catch (err) {
    res.status(400).json({ error: "Failed to save the custom food." });
  }
});

// Get all custom foods for a user
router.get("/:userId", async (req, res) => {
  try {
    const foods = await CustomFood.find({ userId: req.params.userId });
    res.json(foods);
  } catch (err) {
    res.status(400).json({ error: "Failed to retrieve custom foods." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await CustomFood.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.status(200).json({ message: "Food succesfully deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the food" });
  }
});

module.exports = router;
