const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  date: { type: Date, default: Date.now },
  weight: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isPositive,
      message: "Weight must be a positive number",
    },
  },
  photos: [String], // Array of photo URLs
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
