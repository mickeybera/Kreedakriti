import express from "express";
import protectAdmin from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventsWithStats,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/stats", getEventsWithStats);
router.post(
  "/",
  protectAdmin,
  upload.fields([{ name: "eventImage" }, { name: "qrImage" }]),
  createEvent
);

router.put(
  "/:id",
  protectAdmin,
  upload.fields([{ name: "eventImage" }, { name: "qrImage" }]),
  updateEvent
);

router.delete("/:id", protectAdmin, deleteEvent);

export default router;

