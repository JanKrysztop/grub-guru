const express = require("express");
const Nutrition = require("../models/Nutrition");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

router.post("/track-nutrition", async (req, res) => {
  const { userId, date, food, foodLabel, mealType, waterConsumption } =
    req.body;

  try {
    // Parse the date string using moment.js
    const parsedDate = moment(date);
    // Return an error if the date is not valid
    if (!parsedDate.isValid()) {
      return res.status(400).json({
        error: "Invalid date format. The date should be in ISO 8601 format.",
      });
    }

    const startOfDay = parsedDate.startOf("day").toDate();
    const endOfDay = parsedDate.endOf("day").toDate();

    const foodWithLabel = { ...food, label: foodLabel, _id: uuidv4() };
    // Update document to append food item to the specific mealType array
    const update = {
      $push: { [`meals.${mealType}`]: foodWithLabel },
      $set: { waterConsumption: waterConsumption, date: startOfDay },
    };

    const nutrition = await Nutrition.findOneAndUpdate(
      {
        userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      },
      update,
      { new: true, upsert: true }
    );

    res.status(201).json(nutrition);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while tracking food.",
    });
  }
});
router.delete("/delete-food", async (req, res) => {
  const { userId, date, foodId, mealType } = req.body; // Assuming foodId is passed in the request body

  try {
    const parsedDate = moment(date);
    const startOfDay = parsedDate.startOf("day").toDate();
    const endOfDay = parsedDate.endOf("day").toDate();

    // Use $pull to remove the food item by its unique ID
    const result = await Nutrition.findOneAndUpdate(
      { userId, date: { $gte: startOfDay, $lt: endOfDay } },
      { $pull: { [`meals.${mealType}`]: { _id: foodId } } }, // Remove the specific food item
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: "No entry found for the specified criteria." });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while attempting to delete the food item.",
    });
  }
});
// router.post("/track-nutrition", async (req, res) => {
//   const { userId, date, meals, waterIntake } = req.body;

//   try {
//     // Parse the date string using moment.js
//     const parsedDate = moment(date);

//     // Return an error if the date is not valid
//     if (!parsedDate.isValid()) {
//       return res.status(400).json({
//         error: "Invalid date format. The date should be in ISO 8601 format.",
//       });
//     }

//     // Define the start and end of the day
//     const startOfDay = parsedDate.startOf("day").toDate();
//     const endOfDay = parsedDate.endOf("day").toDate();

//     // Find existing document or create a new one
//     const nutrition = await Nutrition.findOneAndUpdate(
//       {
//         userId,
//         date: { $gte: startOfDay, $lt: endOfDay },
//       },
//       {
//         userId,
//         date: startOfDay, // Set the date part to the start of the day
//         meals,
//         waterIntake,
//       },
//       { new: true, upsert: true } // Return the updated document and create if not exists
//     );

//     res.status(201).json(nutrition);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "An error occurred while tracking food.",
//     });
//   }
// });

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
      $or: [
        { "meals.breakfast": { $not: { $size: 0 } } },
        { "meals.secondBreakfast": { $not: { $size: 0 } } },
        { "meals.lunch": { $not: { $size: 0 } } },
        { "meals.snack": { $not: { $size: 0 } } },
        { "meals.dinner": { $not: { $size: 0 } } },
      ],
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
// router.get("/nutrients-range", async (req, res) => {
//   const { userId, startDate, endDate } = req.query;

//   // Parse start and end dates to cover the full days
//   const parsedStartDate = moment(startDate).startOf("day").toDate();
//   const parsedEndDate = moment(endDate).endOf("day").toDate();

//   try {
//     const nutritionRecords = await Nutrition.find({
//       userId,
//       date: { $gte: parsedStartDate, $lte: parsedEndDate },
//       waterIntake: { $gt: 0 },
//       foods: { $ne: [] },
//     });

//     if (!nutritionRecords || nutritionRecords.length === 0) {
//       // If no records are found, return an empty array
//       return res.status(200).json([]);
//     }

//     res.status(200).json(nutritionRecords);
//   } catch (error) {
//     res.status(500).json({
//       error: "An error occurred while retrieving daily nutrients.",
//     });
//   }
// });

module.exports = router;
