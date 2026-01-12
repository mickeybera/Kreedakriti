import express from "express";
import protectAdmin from "../middleware/authMiddleware.js";
import {
  registerEvent,
  // getEventRegistrations,
  getEventStats,
  getRegistrationsByEvent,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", registerEvent);
// router.get("/event/:eventId", protectAdmin, getEventRegistrations);
router.get("/event/:eventId", getRegistrationsByEvent);

router.get("/event/:eventId/stats", protectAdmin, getEventStats);

export default router;
