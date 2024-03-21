const express = require("express");
const Nutrition = require("../models/Nutrition");
const router = express.Router();
const moment = require("moment");

router.post("/track-nutrition", async (req, res) => {
  const { userId, date, meals, waterIntake } = req.body;

  try {
    // Parse the date string using moment.js
    const parsedDate = moment(date);

    // Return an error if the date is not valid
    if (!parsedDate.isValid()) {
      return res.status(400).json({
        error: "Invalid date format. The date should be in ISO 8601 format.",
      });
    }

    // Define the start and end of the day
    const startOfDay = parsedDate.startOf("day").toDate();
    const endOfDay = parsedDate.endOf("day").toDate();

    // Find existing document or create a new one
    const nutrition = await Nutrition.findOneAndUpdate(
      {
        userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      },
      {
        userId,
        date: startOfDay, // Set the date part to the start of the day
        meals,
        waterIntake,
      },
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

  // Parse the date string using moment.js
  const parsedDate = moment(date);

  // Define the start and end of the day
  const startOfDay = parsedDate.startOf("day").toDate();
  const endOfDay = parsedDate.endOf("day").toDate();

  try {
    const nutrition = await Nutrition.findOne({
      userId,
      date: { $gte: startOfDay, $lt: endOfDay }, // Use the same range of date as in your POST route
    });
    if (!nutrition) {
      return res.status(200).json({ foods: [] }); // Default response when no records are found
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving nutrients.",
    });
  }
});

router.get("/nutrients-range", async (req, res) => {
  const { userId, startDate, endDate } = req.query;

  // Parse start and end dates to cover the full days
  const parsedStartDate = moment(startDate).startOf("day").toDate();
  const parsedEndDate = moment(endDate).endOf("day").toDate();

  try {
    const nutritionRecords = await Nutrition.find({
      userId,
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
      waterIntake: { $gt: 0 },
      foods: { $ne: [] },
    });

    if (!nutritionRecords || nutritionRecords.length === 0) {
      // If no records are found, return an empty array
      return res.status(200).json([]);
    }

    res.status(200).json(nutritionRecords);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving daily nutrients.",
    });
  }
});

module.exports = router;
