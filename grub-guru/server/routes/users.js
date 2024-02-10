const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const verifyToken = require("../middleware/verifyToken");
const hasAuthorization = require("../middleware/authorization");

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
    text: `Welcome to Grub Guru! \n\n Please confirm your account by clicking on the following link: \n\n ${process.env.APP_URL}/confirm/${confirmationToken} \n\n`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error); // Log the detailed error to the console
    throw new Error("Error sending confirmation email");
  }
};

router.post("/register", async (req, res) => {
  const {
    username,
    password,
    email,
    age,
    height,
    weight,
    gender,
    recommendedCalories,
  } = req.body;
  //TODO: add info about user/email already being used
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
      recommendedCalories,
      confirmation_token: confirmationToken,
      //confirmation_token_expires_at: confirmationTokenExpiresAt,
    });

    // Save user
    await user.save();
    //Send email
    await sendConfirmationEmail(user, req.headers.host, confirmationToken);

    res.status(201).json({
      message: "User created successfully, confirmation email sent",
    });
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
      return res.status(400).json({
        error: "Invalid or expired confirmation token",
      });
    }

    user.isConfirmed = true;
    user.confirmation_token = undefined;
    // user.confirmation_token_expires_at = undefined;

    await user.save();

    res.json({
      message: "Account confirmed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error confirming account",
    });
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: login }, { email: login }],
  });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  // Check if user's email is confirmed
  if (!user.isConfirmed) {
    return res.status(403).json({
      error:
        "Email not confirmed. Please check your email to confirm your account.",
    });
  }
  try {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });
    // Set HttpOnly cookie
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.json({ token, username: user.username });
  } catch (err) {
    return res.status(500).json({
      error: "Error comparing passwords",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
// Maybe this one is better???
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(403).json({
        error: "Invalid or expired token",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Destructure the user object to exclude sensitive data
    const { password, confirmation_token, ...userData } = user.toObject();

    res.json({ userId: userData._id }); // or res.json(userData) depending on what you need
  } catch (error) {
    res.status(500).json({
      error: "Error fetching user data",
    });
  }
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

router.post("/check-unique", async (req, res) => {
  const { username, email } = req.body;

  try {
    const userByUsername = await User.findOne({ username });
    const userByEmail = await User.findOne({ email });
    if (userByUsername && userByEmail) {
      return res
        .status(409)
        .json({ error: "Both username and email are already taken." });
    }

    if (userByUsername) {
      return res.status(409).json({ error: "Username is already taken." });
    }

    if (userByEmail) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    res.status(200).json({ message: "Username and email are unique." });
  } catch (error) {
    res.status(500).json({ error: "Server error while checking uniqueness." });
  }
});

router.put(
  "/update-profile",
  verifyToken,
  hasAuthorization,
  async (req, res) => {
    const { userId, username, age, weight, recommendedCalories } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.username = username;
      user.age = age;
      user.weight = weight;
      user.recommendedCalories = recommendedCalories;

      await user.save();

      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.put("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user by their ID (from the JWT token)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Update the password
    user.password = newPassword;
    await user.save();
    //Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Your password has been changed",
      text: "Your password has been successfully changed. If you did not make this change, please contact support immediately.",
    });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate token and set expiration
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;

    const timezoneOffset = req.body.timezoneOffset;

    // Create a new Date object for the expiration time
    const resetPasswordExpires = new Date();
    resetPasswordExpires.setMinutes(
      resetPasswordExpires.getMinutes() - timezoneOffset + 60
    );
    user.resetPasswordExpires = resetPasswordExpires;

    await user.save();

    // Send email with reset link (you can use your existing email logic)
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${process.env.APP_URL}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset instructions sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing request" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required." });
  }

  try {
    // Find the user by the reset token
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user || Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    // Update the user's password and clear the reset token
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting the password." });
  }
});

module.exports = router;
