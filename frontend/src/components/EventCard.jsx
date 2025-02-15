import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import cardtop from "../assets/card-top.png";
import cardbottom from "../assets/card-bottam.png";
import { FaLocationDot } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";

const EventCard = ({ event, onDelete, onUpdate }) => {
  const [attendees, setAttendees] = useState(event.attendees.length);
  const socket = io("https://mern-event-manager-4eut.onrender.com");

  useEffect(() => {
    // Listen for real-time attendee updates
    socket.on("attendeesUpdated", (updatedEventId) => {
      if (updatedEventId === event._id) {
        // Fetch the updated event data
        axios.get(`https://mern-event-manager-4eut.onrender.com/api/events/${event._id}`)
          .then((res) => setAttendees(res.data.attendees.length))
          .catch((err) => console.error(err));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [event._id]);
  console.log(event);

  return (
    <div className=" border-x-2 border-amber-300 p-4 my-7 shadow-2xl hover:shadow-lg transition-shadow bg-[#fbe5d980] relative pb-7 cursor-pointer">
      <div className="absolute -top-10 -left-2 w-[104%]">
        <img src={cardtop} alt="" className="w-full"/>
      </div>
      <div className="flex justify-center items-center overflow-hidden rounded-t-2xl">
        <img src={event.image || "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" />
      </div>
      <h3 className="text-2xl mt-3 w-full overflow-hidden font-semibold bg-amber-500 text-white text-center ">{event.name.toUpperCase()}</h3>
      <span className="w-full h-1 block bg-amber-500 rounded my-1.5"></span>
      <p className="text-gray-500">{event.description}</p>
      <br />
      <p className="text-sm text-gray-500">
        Date: {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 flex items-center gap-2 my-3">{attendees > 2 ? <div className="flex justify-center items-center"><FcBusinessman className="border-2 border-green-400 rounded-full text-2xl bg-green-400 z-20"/> <FcBusinessman className="border-2 border-red-300 bg-red-300 rounded-full text-xl relative -left-2 z-10"/> <FcBusinessman className="border-2 border-purple-500 rounded-full text-lg relative -left-4"/></div> : <FcBusinessman className="border-2 border-green-500 rounded-full text-2xl"/>} <span className="text-purple-600">+{attendees} attendees</span></p>
      <p className="text-sm text-gray-500 flex items-center gap-1"><FaLocationDot /> {event.location ? event.location : "near India gate, New Delhi 100001"}</p>
      <div className="mt-4 flex space-x-2">       
        <button
          onClick={() => onUpdate(event)}
          className="bg-yellow-500 border-2 border-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-transparent hover:text-yellow-500 font-bold"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(event._id)}
          className="hover:bg-red-500 text-red-500 border-2 border-red-500 font-bold px-3 py-1 rounded-lg hover:text-white"
        >
          Delete
        </button>
      </div>
      <div className="absolute -bottom-9 -left-2 w-[104%]">
        <img src={cardbottom} alt="" className="w-full"/>
      </div>
    </div>
  );
};

export default EventCard;