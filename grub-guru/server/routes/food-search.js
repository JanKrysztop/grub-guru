const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/food-search", async (req, res) => {
  const { food } = req.query;

  try {
    const response = await axios.get(
      // `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&api_key=${process.env.USDA_API_KEY}`
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}&ingr=${food}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error fetching data from API",
    });
  }
});

// This route is set up for working with BarcodeScanner option
// router.get("/food-search", async (req, res) => {
//   const { food, ean } = req.query;

//   let url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`;

//   if (food) {
//     url += `&ingr=${food}`;
//   } else if (ean) {
//     url += `&upc=${ean}`;
//   } else {
//     return res.status(400).json({ error: "No search query provided" });
//   }

//   try {
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Error fetching data from API",
//     });
//   }
// });

module.exports = router;
