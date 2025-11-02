import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import tripRoutes from "./routes/tripRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => res.send("Epic Nomads Backend Running"));

app.get("/api/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

app.get("/api/tourist/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENTRIPMAP_API_KEY;
    const geoRes = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${apiKey}`
    );
    const { lat, lon } = geoRes.data;
    const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=3000&lon=${lon}&lat=${lat}&rate=2&limit=5&apikey=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data.features);
  } catch {
    res.status(500).json({ message: "Error fetching attractions" });
  }
});

app.get("/api/food/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.FOURSQUARE_API_KEY;
    const url = `https://api.foursquare.com/v3/places/search?query=restaurants&near=${city}&limit=5`;
    const response = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    res.json(response.data.results);
  } catch {
    res.status(500).json({ message: "Error fetching food suggestions" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
