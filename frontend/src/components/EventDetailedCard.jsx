import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import dateImg from "../assets/date.png";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

const EventDetailedCard = () => {
  const [event, setEvent] = useState({
    createdBy: { username: '' },
    location: '',
    attendees: [],
    date: new Date().toISOString(),
    image: '',
    name: '',
    description: ''
  });

  const { user } = useSelector(store => store.auth);
  const { id } = useParams();
  const socket = io("https://mern-event-manager-4eut.onrender.com");

  // Fetch event details
  const fetchEvent = async () => {
      console.log(id);
      try {
        const response = await axios.get(`https://mern-event-manager-4eut.onrender.com/api/events/getEventById/${id}`);
        const data = response.data;
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
  useEffect(() => {
    fetchEvent();
  }, [id]);

  const token = localStorage.getItem("token");
  // Handle joining an event
  const handleJoinEvent = async () => {
    try {

      await axios.post(
        `https://mern-event-manager-4eut.onrender.com/api/events/${id}/attendees`,
        {userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Re-fetch event details to update the UI
      fetchEvent();
    } catch (err) {
      console.error("Error joining event:", err);
      
    }
  };

  // Handle leaving an event
  const handleLeaveEvent = async () => {
    try {
      await axios.delete(`https://mern-event-manager-4eut.onrender.com/api/events/${id}/attendees`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {userId: user._id },
      });

      // Re-fetch event details to update the UI
      fetchEvent();
    } catch (err) {
      console.error("Error leaving event:", err);
    }
  };

  useEffect(() => {
    socket.on("attendeesUpdated", (updatedEventId) => {
      fetchEvent(); // Refresh the events list
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="h-[120vh] flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[120vh] main-container2 overflow-hidden"></div>
      <div className='w-full h-full overflow-hidden'>
        <img 
          className='w-full h-full imageAnimation' 
          src={event.image || "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600"} 
          alt="Event" 
        />
      </div>

      {/* Content */}
      <div className='absolute top-0 left-0 w-full  flex flex-col items-center z-10'>
        <div className="p-4 w-8/12 mt-40 z-10 flex flex-col justify-center items-center max-[769px]:w-full max-[769px]:mt-20">
          <h1 className="font-bold text-[12px] mt-4 border-2 border-green-700 text-green-700 px-4 py-1 rounded-4xl bg-green-200">
            Celebrate Events with Us
          </h1>
          <h1 className='text-5xl max-[426px]:text-2xl max-[769px]:text-3xl max-[1025px]:text-4xl font-bold text-green-900 mt-4'>{event.name}</h1>
          <span className="w-1/3 h-1 block bg-green-700 rounded my-4"></span>         
          <h3 className='text-lg text-gray-700 mt-4 text-center mx-20 max-[426px]:mx-0 max-[426px]:text-sm'>{event.description}</h3>
          
          <div className='flex justify-between items-center w-1/2 my-4 max-[426px]:w-full'>
            <p className="text-lg text-gray-500 flex items-center gap-2 w-8/12">
              <FaLocationDot /> {event.location || "near India gate, New Delhi 100001"}
            </p>
            <span className="text-lg text-gray-500 flex items-center gap-2">
              <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
          <h1 className='text-lg text-gray-500 flex items-center gap-2'>
            <FaUserAlt /> {event.createdBy?.username}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-2 my-3">
            {event.attendees?.length > 2 ? (
              <div className="flex justify-center items-center">
                <FcBusinessman className="border-2 border-green-400 rounded-full text-2xl bg-green-400 z-20" />
                <FcBusinessman className="border-2 border-red-300 bg-red-300 rounded-full text-xl relative -left-2 z-10" />
                <FcBusinessman className="border-2 border-purple-500 rounded-full text-lg relative -left-4" />
              </div>
            ) : (
              <FcBusinessman className="border-2 border-green-500 rounded-full text-2xl" />
            )}
            <span className="text-purple-600">+{event.attendees?.length} attendees</span>
          </p>
  
          <div className="mt-4 cursor-pointer ">
            {user._id && !event.attendees?.includes(user._id) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoinEvent(event._id);
                }}
                className="mt-4 bg-transparent hover:text-white px-12 py-2 rounded-lg transition-all text-green-700 hover:bg-green-700 border-2 border-green-700 font-bold"
                aria-label="Join Event"
              >
                Join Event
              </button>
            )}
            {user._id && event.attendees?.includes(user._id) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeaveEvent(event._id);
                }}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg transition-all hover:bg-transparent hover:text-red-500 border-2 border-red-500 hover:font-bold"
                aria-label="Leave Event"
              >
                Leave Event
              </button>
            )}
          </div>
        </div> 
      </div>
    </div>
  );
};

export default EventDetailedCard;