const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const verifyToken = require("../middleware/verifyToken");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = async (user, host, confirmationToken) => {
  //Send confirmation email
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: "Please confirm your account",
    text: `Welcome to Grub Guru! \n\n Please confirm your account by clicking on the following link: \n\n http://${host}/confirm/${confirmationToken} \n\n`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error); // Log the detailed error to the console
    throw new Error("Error sending confirmation email");
  }
};

router.post("/register", async (req, res) => {
  const { username, password, email, age, height, weight, gender } = req.body;

  try {
    //Generate confirmation token
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    //const confirmationTokenExpiresAt = new Date();
    // confirmationTokenExpiresAt.setHours(confirmationTokenExpiresAt.getHours() + 1)

    const user = new User({
      username,
      password,
      email,
      age,
      height,
      weight,
      gender,
      confirmation_token: confirmationToken,
      //confirmation_token_expires_at: confirmationTokenExpiresAt,
    });

    await sendConfirmationEmail(user, req.headers.host, confirmationToken);

    // Save user
    await user.save();

    res
      .status(201)
      .json({ message: "User created successfully, confirmation email sent" });
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).json({ error: error.message }); // Send the error message in the response
  }
});

router.get("/confirm/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      confirmation_token: req.params.token,
      // confirmation_token_expires_at: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired confirmation token" });
    }

    user.isConfirmed = true;
    user.confirmation_token = undefined;
    // user.confirmation_token_expires_at = undefined;

    await user.save();

    res.json({ message: "Account confirmed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error confirming account" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  try {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    res.json({ token, username: user.username });
  } catch (err) {
    return res.status(500).json({ error: "Error comparing passwords" });
  }
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
