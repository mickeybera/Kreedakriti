import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  studentName: String,
  phone: String,
  transactionId: String,
  amountPaid: Number,
});

export default mongoose.model("Registration", registrationSchema);
