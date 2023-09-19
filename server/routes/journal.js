const express = require("express");
const JournalEntry = require("../models/JournalEntry"); // Adjust the path to your model
const router = express.Router();
const moment = require("moment");

router.post("/journal", async (req, res) => {
  const { userId, date, weight, photos } = req.body;

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
    const journal = await JournalEntry.findOneAndUpdate(
      {
        userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      },
      {
        userId,
        date: startOfDay, // Set the date part to the start of the day
        weight,
        photos,
      },
      { new: true, upsert: true } // Return the updated document and create if not exists
    );

    res.status(201).json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the journal entry.",
    });
  }
});

router.get("/journal", async (req, res) => {
  const { userId, date } = req.query;

  // Parse the date string using moment.js
  const parsedDate = moment(date);

  // Define the start and end of the day
  const startOfDay = parsedDate.startOf("day").toDate();
  const endOfDay = parsedDate.endOf("day").toDate();

  try {
    const journal = await JournalEntry.findOne({
      userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found." });
    }
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving the journal entry.",
    });
  }
});

router.put("/journal", async (req, res) => {
  const { userId, date, weight, photos } = req.body;

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

    // Find the document and update it
    const journal = await JournalEntry.findOneAndUpdate(
      {
        userId,
        date: { $gte: startOfDay, $lt: endOfDay },
      },
      {
        userId,
        date: startOfDay, // Set the date part to the start of the day
        weight,
        photos,
      },
      { new: true } // Return the updated document
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found." });
    }

    res.status(200).json(journal);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the journal entry.",
    });
  }
});

module.exports = router;
