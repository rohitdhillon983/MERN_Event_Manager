import React, { useState } from 'react';
import "../App.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const city = "Delhi";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true

    try {
      const response = await fetch('https://mern-event-manager-4eut.onrender.com/api/contactUs', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Message sent successfully!');
        setErrorMessage('');
        setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json(); // Try to get error details from API
        setErrorMessage(errorData.message || 'Error sending message. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
      console.error("Contact form error:", error); // Log the error for debugging
    } finally {
      setIsLoading(false); // Set loading to false regardless of success/failure
    }
  };

  return (
    <div className="main-container">
      {/* hero section */}
      <div className='pt-20 w-11/12 mx-auto'>
          <div class="py-10 flex flex-col items-center ">
            <img alt="Portrait of a smiling person" class="mx-auto rounded-full" height="100" src="https://storage.googleapis.com/a1aa/image/84XNnvvxV23KyWSOyAI67DY26ZOoMqn15frNrQUIZ6k.jpg" width="100"/>
            <h1 class=" font-bold mt-4 border-2 max-[769px]:text-[12px] border-green-700 text-green-700 px-4 py-1 rounded-4xl bg-green-200">
                Contact Us
            </h1>
            <p class="text-gray-800 mt-2 text-3xl max-[769px]:text-2xl text-center font-semibold w-9/12">
                We're Here to Help! Have questions or need assistance? <span className='text-green-700 font-bold'>Contact us anytime</span>, and our team will be happy to assist you.
            </p>
            
          </div>
          <div class="bg-white py-10 rounded-t-2xl ">
            <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center">
                  <div class="bg-teal-500 text-white rounded-full w-16 h-16 max-[769px]:w-12 max-[769px]:h-12 flex items-center justify-center mx-auto">
                    <IoIosMailUnread className='text-4xl'/>
                  </div>
                  <h2 class="text-xl font-bold mt-4 max-[769px]:text-lg">
                    Mail
                  </h2>
                  <p class="text-gray-600 mt-2">
                    rohitdhillon983@gmail.com
                    <br/>
                    admin@gmail.com
                  </p>
                </div>
                <div class="text-center">
                  <div class="bg-teal-500 text-white rounded-full w-16 h-16 max-[769px]:w-12 max-[769px]:h-12 flex items-center justify-center mx-auto">
                    <FaPhoneAlt  className='text-3xl'/>
                  </div>
                  <h2 class="text-xl font-bold mt-4 max-[769px]:text-lg">
                    PHONE (LANDLINE)
                  </h2>
                  <p class="text-gray-600 mt-2">
                    + 912 3 567 8987
                    <br/>
                    + 912 5 252 3336
                  </p>
                </div>
                <div class="text-center">
                  <div class="bg-teal-500 text-white rounded-full w-16 h-16 max-[769px]:w-12 max-[769px]:h-12 flex items-center justify-center mx-auto">
                    <FaLocationDot className='text-3xl'/>
                  </div>
                  <h2 class="text-xl font-bold mt-4 max-[769px]:text-lg">
                    OUR OFFICE LOCATION
                  </h2>
                  <p class="text-gray-600 mt-2">
                    The Interior Design Studio Company
                    <br/>
                    The Courtyard, Al Quoz 1, Colorado, USA
                  </p>
                </div>
            </div>
          </div>
      </div>

      <div className="w-11/12 mx-auto">
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <div className='flex justify-between items-center gap-7 w-full mx-auto bg-gray-100 rounded-b-2xl p-5 mb-8 max-[426px]:flex-col'>
          {/* map */}
          <div className=' md:w-1/2 h-96 rounded-2xl overflow-hidden'>
            <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${localStorage.getItem('latitude')}!2d${localStorage.getItem('longitude')}!3d${city}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${city}!2s${city}!5e0!3m2!1sen!2sus!4v1655521161713!5m2!1sen!2sus`} width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          {/* form */}
          <div className=' md:w-1/2'>
            <form onSubmit={handleSubmit}>
              <div className='flex justify-between mb-4 gap-5'>
                <div className="w-1/2">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                    required
                  />
                </div>

                <div className='w-1/2'>
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                  required
                ></textarea>
              </div>
              <div className="text-center"> {/* Center the button */}
                <button
                  type="submit"
                  className={`px-8 py-1.5 bg-green-700 text-white rounded-2xl hover:bg-green-600 text-xl font-semibold ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : '' // Disable during loading
                  }`}
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading ? 'Sending...' : 'Submit'} {/* Show "Sending..." when loading */}
                </button>
              </div>
            </form>
          </div>
        </div>

      
      </div>
      
    </div>
  );
};

export default ContactUs;