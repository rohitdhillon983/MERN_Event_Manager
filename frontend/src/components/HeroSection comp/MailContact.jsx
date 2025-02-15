import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";


const MailContact = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle email submission (e.g., send to backend)
    console.log('Submitted email:', email);
  };

  return (
    <section className="backgroundclr text-white py-16">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">1% OF THE INDUSTRY</p>
        <h1 className="text-4xl font-bold px-1 mb-6 max-[769px]:text-3xl max-[425px]:text-2xl">Welcome to your new digital reality. Now.</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <input
              type="email"
              className="w-full max-w-md px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:border-blue-500"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#FFA500] hover:bg-[#1C4670] text-white px-4 py-2 rounded-r-md"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-8 space-x-4">
          <div className="flex items-center">
            <span className='bg-white rounded-full text-[#0b0e33] p-1'><FaCheck className='w-3 h-3'/></span>
            <span className="ml-2">Instant results</span>
          </div>
          <div className="flex items-center">
            <span className='bg-white rounded-full text-[#0b0e33] p-1'><FaCheck className='w-3 h-3'/></span>
            <span className="ml-2">User-friendly interface</span>
          </div>
          <div className="flex items-center">
            <span className='bg-white rounded-full text-[#0b0e33] p-1'><FaCheck className='w-3 h-3'/></span>
            <span className="ml-2">Personalized customization</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailContact;