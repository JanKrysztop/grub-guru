const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: Date,
  meals: {
    breakfast: [{ type: mongoose.Schema.Types.Mixed }],
    secondBreakfast: [{ type: mongoose.Schema.Types.Mixed }],
    lunch: [{ type: mongoose.Schema.Types.Mixed }],
    snack: [{ type: mongoose.Schema.Types.Mixed }],
    dinner: [{ type: mongoose.Schema.Types.Mixed }],
  },
  waterConsumption: { Number },
});

module.exports = mongoose.model("Nutrition", NutritionSchema);
