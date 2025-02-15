const express = require("express");
const { createEvent, getEvents, updateEvent, deleteEvent, addAttendee, removeAttendee, getAllEvents, getEventById } = require("../controllers/eventController");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/", auth,upload.single("image"), createEvent);
router.get("/getEvents", auth, getEvents);
router.get("/getEventById/:id", getEventById);
router.put("/:id", auth,upload.single("image"), updateEvent);
router.delete("/:id", auth, deleteEvent);
router.get("/all", getAllEvents);

// Attendee routes
router.post("/:eventId/attendees", auth, addAttendee);
router.delete("/:eventId/attendees", auth, removeAttendee);

module.exports = router;