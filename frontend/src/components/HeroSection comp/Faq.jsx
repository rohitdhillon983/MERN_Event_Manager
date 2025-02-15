import React, { useState } from 'react';
import { FaAngleRight,FaArrowRight } from "react-icons/fa";
import "../../App.css";

const Faq = () => {
  const [isOpen, setIsOpen] = useState(false);

  const faqs = [
    {
      question: "What is eventHub management Company?",
      Answer:"EventHub management Company is a comprehensive technology solution designed to assist event planners in organizing various types of events, such as conferences, workshops, and trade shows, across different formats like onsite, online, and hybrid.",
    },
    {
      question: "How does event management software help organize successful events?",
      Answer:"Event management software can benefit event planners in many ways. Experience the advantages of Event Management Platform"
    },
    {
      question: "What are the key features of event management software?",
      Answer:"Event Creation and Customization.Event Creation Wizard: Easy-to-use interface for creating events with customizable details (name, date, time, location, description, etc.) ,Custom Branding: Ability to add logos, banners, and themes to match the event's branding. ,Event Templates: Pre-designed templates for different types of events (conferences, webinars, workshops, etc.),Event Planning and Scheduling. Event Creation Wizard: Easy-to-use interface for creating events with customizable details (name, date, time, location, description, etc.) ,Custom Branding: Ability to add logos, banners, and themes to match the event's branding.','Event Templates: Pre-designed templates for different types of events (conferences, webinars, workshops, etc.) "
    },
    {
      question: "What is the difference between virtual event management software and webinar software?",
      Answer:"First things first, virtual events are not webinars. They are more multidimensional and based on the event planner’s goals, and they might include multiple sessions, networking areas, and even exhibitor booths. Most of these options are not supported by webinar solutions."
    },
    {
      question: "Can I recover deleted files from desktop with this software?",
      Answer:"Yes, you can recover deleted files from your desktop. You can download the deleted file to your computer and then restore it."
    }
]
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <p className="text-[14px] leading-9 tracking-[0.16px] font-bold text-center text-green-700">FAQ</p>
      <h2 className="text-[32px] leading-9 tracking-[0.16px] font-bold text-center mb-8">
        Frequent Ask Questions
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {faqs.map((faq, index) =>         
        <div className={` ${isOpen === index ? "bg-[#4594283a] border-2 border-green-700 border-l-0" : "bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"}  shadowRight rounded-md p-4`} onClick={() => setIsOpen(isOpen === index ? null : index)}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">
              {faq.question}
            </h3>
            <FaAngleRight className='text-green-700'/>
          </div>
          {isOpen === index && (
            <div className="mt-2">
              <p className="text-gray-600">{faq.Answer}</p>
            </div>
          )}
        </div>
      )}
      </div>
      <button className="button flex justify-center items-center gap-4 mt-8">Learn More <FaArrowRight /></button>
    </div>
  );
};

export default Faq;