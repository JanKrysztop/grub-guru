const express = require("express");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users");
const cors = require("cors");

async function connectToDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

connectToDb();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", usersRoute);

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
