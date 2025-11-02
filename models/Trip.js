import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    travelMode: { type: String, required: true },
    stayType: { type: String, required: true },
    travelDate: { type: String },
    budget: { type: Number },
    weather: { type: Object },
    attractions: { type: Array },
    food: { type: Array },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
