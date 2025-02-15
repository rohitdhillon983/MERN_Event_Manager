import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import cardtop from "../assets/card-top.png";
import cardbottom from "../assets/card-bottam.png";
import { FaLocationDot } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import Loading from "../components/Loader";
import { useNavigate } from "react-router-dom";
import dateImg from "../assets/date.png";
import { io } from "socket.io-client";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null); // Ref for the modal
  const navigate = useNavigate();
  const socket = io("https://mern-event-manager-4eut.onrender.com");

  useEffect(() => {
    fetchEvents();
    fetchCurrentUser();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO");
    });

    socket.on("attendeesUpdated", () => {
      fetchEvents();
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from Socket.IO");
    };
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, searchQuery]);

  // Fetch All events
  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://mern-event-manager-4eut.onrender.com/api/events/all");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Fetch current user
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.get("https://mern-event-manager-4eut.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.userId);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  // Handle joining an event
  const handleJoinEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://mern-event-manager-4eut.onrender.com/api/events/${eventId}/attendees`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the events state to trigger a re-render
      const updatedEvents = events.map((event) => {
        if (event._id === eventId) {
          return { ...event, attendees: [...event.attendees, userId] };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (err) {
      console.error("Error joining event:", err);
      if (err.response && err.response.data.error === "User already joined the event") {
        alert("You have already joined this event.");
      }
    }
  };

  // Handle leaving an event
  const handleLeaveEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://mern-event-manager-4eut.onrender.com/api/events/${eventId}/attendees`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userId },
      });

      // Update the events state to trigger a re-render
      const updatedEvents = events.map((event) => {
        if (event._id === eventId) {
          return {
            ...event,
            attendees: event.attendees.filter((attendee) => attendee !== userId),
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (err) {
      console.error("Error leaving event:", err);
    }
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = events;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };
  
  const HandleOpenEvent = (event) => {
      navigate(`/events/${event._id}`);
  };

  useEffect(() => {
    // Listen for real-time attendee updates
    socket.on("attendeesUpdated", (updatedEventId) => {
      fetchEvents(); // Refresh the events list
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute top-0 left-0 w-full min-h-[150vh] main-container"></div>

      {/* Heading */}
      <div className="p-4 mt-20 w-11/12 z-10">
        <div className="flex flex-col justify-center items-center w-full my-10">
          <h1 className="font-bold mt-4 max-[769px]:text-[12px] border-2 border-green-700 text-green-700 px-4 py-1 rounded-4xl bg-green-200">
            Welcome to Events
          </h1>
          <p className="text-gray-800 mt-2 text-4xl max-[769px]:text-3xl max-[426px]:text-2xl text-center font-semibold">
            Easily capture, organize, and manage your{" "}
            <span className="text-green-600">Event in one place</span>. Add text,
            <span className="text-green-600"> Sort, search</span>, and edit your Event effortlessly.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-8 w-1/3 max-[769px]:w-1/2 max-[426px]:w-11/12 z-10 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border-2 rounded-l-2xl outline-none border-green-600 bg-white"
        />
        <div className="px-8 bg-green-600 py-[13px] border-t border-r border-green-600 rounded-r-2xl">
          <FaSearch />
        </div>
      </div>

      {/* Event cards */}
      <div className="max-w-7xl mx-auto z-10">
        {filteredEvents.length === 0 && <Loading />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              onClick={() => HandleOpenEvent(event)} // Open modal on click
              className="border-x-2 border-amber-300 p-4 my-8 shadow-2xl hover:shadow-lg transition-shadow bg-[#fbe5d980] relative pb-7 cursor-pointer"
            >
              <div className="absolute -top-10 -left-2 w-[104%]">
                <img src={cardtop} alt="" className="w-full" />
              </div>

              <div className="flex justify-center items-center overflow-hidden rounded-t-2xl w-full h-[200px]">
                <img
                  src={event.image || "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"}
                  alt=""
                />
              </div>
              <div className="relative">
                <h3 className="text-2xl mt-3 w-full h-[35px] overflow-hidden font-semibold bg-amber-500 text-white text-center">
                  {event.name.toUpperCase()}
                </h3>
                <span className="w-full h-1 block bg-amber-500 rounded my-1.5"></span>

                <p className="text-gray-500 mb-4 overflow-hidden min-h-[100px]">
                  {event.description.slice(0, 200)}
                  {event.description.length > 200 && "..."}
                </p>

                <p className={`absolute -top-22 -right-3 text-sm text-gray-500 p-4 flex flex-col justify-center items-center`}>                 
                    <span className="text-amber-500 text-3xl font-bold z-10 relative -top-1">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-gray-400 text-sm font-bold z-10  relative -top-1.5">
                      {new Date(event.date).toLocaleString("default", { month: "short" })}{" "}
                      {new Date(event.date).getFullYear()}
                    </span>
                    <div className="absolute top-0 left-0">
                      <img src={dateImg} alt="" />
                    </div>                
                </p>
                
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Created By:</span> {event.createdBy.username}
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-2 my-3">
                  {event.attendees.length > 2 ? (
                    <div className="flex justify-center items-center">
                      <FcBusinessman className="border-2 border-green-400 rounded-full text-2xl bg-green-400 z-20" />
                      <FcBusinessman className="border-2 border-red-300 bg-red-300 rounded-full text-xl relative -left-2 z-10" />
                      <FcBusinessman className="border-2 border-purple-500 rounded-full text-lg relative -left-4" />
                    </div>
                  ) : (
                    <FcBusinessman className="border-2 border-green-500 rounded-full text-2xl" />
                  )}{" "}
                  <span className="text-purple-600">+{event.attendees.length} attendees</span>
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-2  w-8/12">
                  <FaLocationDot /> {event.location ? event.location : "near India gate, New Delhi 100001"}
                </p>
              </div>

              <div className="mt-4 cursor-pointer absolute bottom-6 right-6">
                {userId && !event.attendees.includes(userId) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      handleJoinEvent(event._id);
                    }}
                    className="mt-4 bg-transparent hover:text-white px-4 py-2 rounded-lg transition-all text-green-500 hover:bg-green-500 border-2 border-green-500 font-bold"
                  >
                    Join Event
                  </button>
                )}
                {userId && event.attendees.includes(userId) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      handleLeaveEvent(event._id);
                    }}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-transparent hover:text-red-500 border-2 border-red-500 hover:font-bold"
                  >
                    Leave Event
                  </button>
                )}
              </div>

              <div className="absolute -bottom-10 -left-2 w-[104%]">
                <img src={cardbottom} alt="" className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;