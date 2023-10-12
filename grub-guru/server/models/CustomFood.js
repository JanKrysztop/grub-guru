const mongoose = require("mongoose");

const customFoodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  energyNutrient: {
    type: Number,
    required: true,
  },
  nutrients: {
    CHOCDF: Number, // Carbs
    PROCNT: Number, // Protein
    FAT: Number, // Fat
  },
  servingSize: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("CustomFood", customFoodSchema);
