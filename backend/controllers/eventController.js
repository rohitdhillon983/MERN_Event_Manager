const Event = require("../models/Event");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
  });

exports.createEvent = async (req, res) => {
  const { name, description, date,location } = req.body;
  const image = req.file;

  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "event_images", // Optional: Organize images in a folder
    });

    const event = new Event({ name, description, date,location ,createdBy: req.user.id, image: result.secure_url });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const events = await Event.find({ createdBy: id }).populate("createdBy", "username");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).populate("createdBy", "username");
    res.json(events); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getEventById = async (req, res) => {
  const id = req.params.id;
  
  try {
    const event = await Event.findById({_id:id}).populate("createdBy", "username");
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.updateEvent = async (req, res) => {
  const { name, description, date,location } = req.body;
  const image = req.file;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "event_images", // Optional: Organize images in a folder
    });

    event.image = result.secure_url;
    event.name = name;
    event.description = description;
    event.date = date;
    event.location = location;
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });    
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAttendee = async (req, res) => {
  const { eventId } = req.params;
  // const { userId } = req.body;
  const userId = req.user.id;
  console.log(userId);

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Check if the user is already an attendee
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ error: "User already joined the event" });
    }

    // Add the user to the attendees list
    event.attendees.push(userId);
    await event.save();

    // Emit a Socket.IO event to update attendees in real-time
    req.io.emit("attendeesUpdated", eventId);

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeAttendee = async (req, res) => {
  const { eventId } = req.params;
  // const { userId } = req.body;
  const userId = req.user.id;
  // console.log(eventId);
  try {
    const event = await Event.findById(eventId);
    // console.log(event);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // Remove the user from the attendees list
    event.attendees = event.attendees.filter((attendee) => attendee.toString() !== userId);
    await event.save();

    // Emit a Socket.IO event to update attendees in real-time
    req.io.emit("attendeesUpdated", eventId);

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
