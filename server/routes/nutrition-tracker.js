const express = require("express");
const Nutrition = require("../models/Nutrition");
const router = express.Router();

router.post("/track-nutrition", async (req, res) => {
  const { userId, date, foods } = req.body;

  try {
    // Convert date to a consistent format without time
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    // Find existing document or create a new one
    const nutrition = await Nutrition.findOneAndUpdate(
      { userId, date: dateOnly },
      { userId, date: dateOnly, foods },
      { new: true, upsert: true } // Return the updated document and create if not exists
    );

    res.status(201).json(nutrition);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while tracking food.",
    });
  }
});

router.get("/daily-nutrients", async (req, res) => {
  const { userId, date } = req.query;

  try {
    const nutrients = await Nutrition.find({
      userId,
      date,
    });
    res.status(200).json(nutrients);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving nutrients.",
    });
  }
});
module.exports = router;
