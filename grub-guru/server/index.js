if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
} else {
  require("dotenv").config({ path: ".env.production" });
}

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
    await mongoose.connect(process.env.MONGODB_URI, {
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
    origin: process.env.CORS_URL,
    credentials: true,
  })
);

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use("/users", usersRoute);

app.use("/api", foodSearchRoute);

app.use("/nutrition", nutritionRoutes);

app.use("/custom-food", customFoodRoutes);

app.use("/journal", journalRoutes);

module.exports.handler = serverless(app);

//This is needed only for local development
if (process.env.NODE_ENV === "development") {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}
