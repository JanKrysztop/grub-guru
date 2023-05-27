const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const verifyToken = require("../middleware/verifyToken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });

  try {
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering new user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  user.comparePassword(password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ error: "Error comparing passwords" });
    }
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    res.json({ token, username: user.username });
  });
});

router.get("/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

router.get("/users", verifyToken, async (req, res) => {
  // optional: check if the user is an admin
  // if (!req.user.isAdmin) {
  //   return res.status(403).json({ error: 'User is not an admin' });
  // }

  const users = await User.find({}).select("-password");
  if (!users) {
    return res.status(404).json({ error: "No users found" });
  }
  res.json(users);
});

module.exports = router;
