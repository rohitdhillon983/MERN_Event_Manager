import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import { FaAngleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/authSlice";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://mern-event-manager-4eut.onrender.com/api/events/getEvents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Ensure the response data is an array
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        console.error("Expected an array of events, but got:", res.data);
        setEvents([]); // Set events to an empty array to avoid errors
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]); // Set events to an empty array in case of an error
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://mern-event-manager-4eut.onrender.com/api/events", eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
      setShowForm(false);
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const handleUpdateEvent = async (eventData) => {
    // console.log("",eventData);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://mern-event-manager-4eut.onrender.com/api/events/${selectedEvent._id}`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
      setSelectedEvent(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://mern-event-manager-4eut.onrender.com/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    dispatch(setUser(null));
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex justify-center main-container">
      <div className="p-4 mt-20 w-11/12">
        <div className="flex justify-between items-center">
          <p></p>
          <button
            onClick={handleLogout}
              className="button flex justify-center items-center gap-1"
            >
              Logout <FaAngleRight className="mt-1"/>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-full my-10">
            <h1 class=" font-bold max-[769px]:text-[12px] mt-4 border-2 border-green-700 text-green-700 px-4 py-1 rounded-4xl bg-green-200">
                Welcome to Your Dashboard
            </h1>
            <p class="text-gray-800 mt-2 text-4xl max-[769px]:text-3xl max-[426px]:text-2xl text-center font-semibold ">
              Easily capture, organize, and manage your <span className="text-green-600">Event in one place</span>. Add text,<span className="text-green-600"> Sort, search</span>, and edit your Event effortlessly.          
            </p>
        </div>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setShowForm(!showForm);
          }}
          className="button my-10 flex justify-center items-center gap-1"
        >
          {showForm ? "Hide Form" : "Create Event"} <FaAngleRight />
        </button>
        {showForm && (
          <EventForm
            onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
            initialData={selectedEvent || {}}
          />
        )}
        <EventList
          events={events}
          onDelete={handleDeleteEvent}
          onUpdate={(event) => {
            setSelectedEvent(event);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;