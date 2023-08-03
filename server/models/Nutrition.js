const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  date: Date,
  foods: [
    {
      label: String,
      energyNutrient: Number,
      nutrients: {
        CHOCDF: Number,
        PROCNT: Number,
        FAT: Number,
      },
      servingSize: Number,
    },
  ],
});

module.exports = mongoose.model("Nutrition", NutritionSchema);
