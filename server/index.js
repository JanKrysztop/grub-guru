require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersRoute = require("./routes/users");
const foodSearchRoute = require("./routes/food-search");
const nutritionRoutes = require("./routes/nutrition-tracker");
const customFoodRoutes = require("./routes/custom-food");
const journalRoutes = require("./routes/journal");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //Check what this does
      // useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

connectToDb();

const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000", // replace with your client UR L
    origin: "https://grub-guru.vercel.app", // replace with your Vercel deployment URL
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/users", usersRoute);

app.use("/api", foodSearchRoute);

app.use("/nutrition", nutritionRoutes);

app.use("/custom-food", customFoodRoutes);

app.use("/journal", journalRoutes);

module.exports.handler = serverless(app);

//This is needed only for local development
// app.listen(3001, () => {
//   console.log("Server running on port 3001");
// });
