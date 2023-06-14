const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/food-search", async (req, res) => {
  const { food } = req.query;

  try {
    const response = await axios.get(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&api_key=${process.env.USDA_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data from USDA API" });
  }
});

module.exports = router;
