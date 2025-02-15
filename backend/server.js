const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const socketIo = require("socket.io");
const dbConnect = require("./utils/db");
const http = require("http");
const cookieParser = require("cookie-parser");
// const {cloudinaryConnect} = require('./utils/cloudinary');
const env = require("dotenv");
const { contactUs } = require("./controllers/contactUsController");


dotenv.config();
// cloudinaryConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// dbConnect();

// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

// Pass the Socket.IO instance to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  // console.log("A user connected");

  // Handle attendee updates
  socket.on("updateAttendees", (eventId) => {
    // Emit the updated attendee count to all clients
    io.emit("attendeesUpdated", eventId);
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});


// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/event"));
app.use("/api/contactUs",contactUs);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    dbConnect();
});