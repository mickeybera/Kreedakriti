import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  fee: Number,
  eventImage: String,
  qrImage: String,
});

export default mongoose.model("Event", eventSchema);
