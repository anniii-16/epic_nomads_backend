import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

import authRoutes from "./routes/auth.js";
import tripRoutes from "./routes/tripRoutes.js";
import foodRoutes from "./routes/food.js";

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));


app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/food", foodRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ message: "Epic Nomads Backend Running" });
});


app.get("/api/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});


app.get("/api/tourist/:city", async (req, res) => {
  try {
    const { city } = req.params;

    const geo = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.OPENTRIPMAP_API_KEY}`
    );

    if (!geo.data || !geo.data.lat || !geo.data.lon) {
      return res.status(404).json({ message: "City not found" });
    }

    const { lat, lon } = geo.data;

    const response = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=3000&lon=${lon}&lat=${lat}&limit=6&apikey=${process.env.OPENTRIPMAP_API_KEY}`
    );

    res.json(response.data.features);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attractions" });
  }
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
