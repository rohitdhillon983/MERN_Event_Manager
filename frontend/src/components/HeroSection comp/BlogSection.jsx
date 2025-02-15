import axios from 'axios';
import React, { useEffect } from 'react';
import { FaAngleRight,FaArrowRight,FaCalendarAlt  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const [events, setEvents] = React.useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://mern-event-manager-4eut.onrender.com/api/events/all");
      setEvents((prevEvents) => [
        res.data.sort((a, b) => new Date(b.date) - new Date(a.date))[0],
        ...prevEvents,
      ]);
      setEvents((res.data));
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  // console.log(events);

  return (
    <section className="container mx-auto py-16 overflow-hidden">
      <h2 className="text-[14px] leading-9 tracking-[0.16px] font-bold text-center text-green-700">Explore Our Events</h2>
      <h3 className="text-[32px] leading-9 tracking-[0.16px] font-bold text-center mb-12 max-[769px]:text-[24px]">Explore Our upcoming events</h3>
      <div className="grid grid-cols-3 max-[769px]:grid-cols-2 max-[426px]:grid-cols-1 gap-8 px-8">
        {events.slice(0, 6).map((event) => (
          <div key={event._id} className="flex flex-col basis-1/3 p-4 shadow-xl rounded-2xl">
            <img src={event.image || 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={event.title} className="w-full h-[200px] object-cover rounded-t-lg" />
            <div className="bg-white rounded-b-lg">
              <h4 className="text-lg font-bold mt-2 text-center bg-amber-600 text-white">{event.name}</h4>
              <span className="w-full h-1 block bg-amber-500 rounded my-1.5"></span>
              <p className="text-sm text-gray-500 mt-4 min-h-24">{event.description.substring(0, 150)}...</p>
                              <p className="text-sm text-gray-500 flex items-center gap-1"><FaLocationDot /> {event.location ? event.location : "near India gate, New Delhi 100001"}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm flex items-center gap-2"><FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}</span>
                <Link to={`/events/${event._id}`} className="flex items-center gap-2 text-purple-600 font-semibold ">
                  Read More <FiArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center flex justify-center mt-8">
        <Link to="/events" className="button flex justify-center items-center gap-4">show more Events <FaArrowRight /></Link>
      </div>
    </section>
  );
};

export default BlogSection;