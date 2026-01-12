import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Helper function: upload image buffer to Cloudinary
 * @param {Buffer} buffer - image buffer from multer
 * @param {String} folder - folder name in Cloudinary
 * @returns {Promise} - resolves with Cloudinary result
 */
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

/**
 * Create a new event (Admin only)
 */
export const createEvent = async (req, res) => {
  try {
    if (!req.files || !req.files.eventImage || !req.files.qrImage) {
      return res.status(400).json({ message: "Both event and QR images are required" });
    }

    const eventImageUpload = await uploadToCloudinary(req.files.eventImage[0].buffer, "events");
    const qrImageUpload = await uploadToCloudinary(req.files.qrImage[0].buffer, "qr");

    const event = await Event.create({
      ...req.body,
      eventImage: eventImageUpload.secure_url,
      qrImage: qrImageUpload.secure_url
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all events (Public)
 */
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update an existing event (Admin only)
 */
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Update normal fields
    Object.assign(event, req.body);

    // Update event image if provided
    if (req.files?.eventImage) {
      const eventImageUpload = await uploadToCloudinary(req.files.eventImage[0].buffer, "events");
      event.eventImage = eventImageUpload.secure_url;
    }

    // Update QR image if provided
    if (req.files?.qrImage) {
      const qrImageUpload = await uploadToCloudinary(req.files.qrImage[0].buffer, "qr");
      event.qrImage = qrImageUpload.secure_url;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete an event (Admin only)
 */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getEventsWithStats = async (req, res) => {
  try {
    const events = await Event.find();

    const result = await Promise.all(
      events.map(async event => {
        const regs = await Registration.find({ event: event._id });
        const totalAmount = regs.reduce((sum, r) => sum + Number(r.fee || 0), 0);
        return {
          ...event._doc,
          registrationsCount: regs.length,
          totalAmount,
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
