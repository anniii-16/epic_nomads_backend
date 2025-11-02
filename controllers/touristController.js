import axios from "axios";

export const getTouristPlaces = async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.TOURIST_API_KEY;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${city}&key=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tourist places" });
  }
};
