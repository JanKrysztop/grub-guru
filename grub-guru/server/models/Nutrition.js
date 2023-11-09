const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: Date,
  foods: [],
  waterIntake: { Number },
});

module.exports = mongoose.model("Nutrition", NutritionSchema);
