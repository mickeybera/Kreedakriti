import Registration from "../models/Registartion.js";
import mongoose from "mongoose";

// ✅ Register for an event
export const registerEvent = async (req, res) => {
  try {
    const { eventId, phone, amountPaid } = req.body;

    const exists = await Registration.findOne({ eventId, phone });
    if (exists) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registration = await Registration.create({
      ...req.body,
      eventId: new mongoose.Types.ObjectId(eventId),
      amountPaid: Number(amountPaid), // 🔥 force number
    });

    res.status(201).json(registration);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get registrations for a specific event
export const getRegistrationsByEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({
      eventId: req.params.eventId, // ✅ FIXED
    });

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get event stats (count + total amount)
export const getEventStats = async (req, res) => {
  try {
    const stats = await Registration.aggregate([
      {
        $match: {
          eventId: new mongoose.Types.ObjectId(req.params.eventId),
        },
      },
      {
        $group: {
          _id: "$eventId",
          totalAmount: { $sum: "$amountPaid" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(
      stats[0] || { totalAmount: 0, count: 0 }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
