import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
    
    const geoResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
    );

    if (!geoResponse.data.length) {
      return res.status(404).json({ message: "City not found" });
    }

    const { lat, lon } = geoResponse.data[0];

    
    const fsqResponse = await axios.get(
      "https://api.foursquare.com/v3/places/search",
      {
        headers: {
          Authorization: process.env.FOURSQUARE_API_KEY,
        },
        params: {
          ll: `${lat},${lon}`,
          categories: "13065", 
          limit: 10,
        },
      }
    );

    
    res.json(fsqResponse.data.results);
  } catch (err) {
    console.error("Error fetching food data:", err.message);
    res.status(500).json({ message: "Error fetching food data" });
  }
});

export default router;
