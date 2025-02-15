import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import user from "../../assets/New folder/user.png";

const TestimonialCard = () => {
  const testimonials = [
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure sint amet occaecat cupidatat non proident ea commodo consequat aute irure sint amet occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  return (
    <div className="bg-gradient-to-br from-[#025302] via-[#019d11] to-[#094201] py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className=" text-white text-4xl font-semibold">
          What people say about us
        </h2>
        <div className="mt-8 relative">
          {/* Testimonials container */}
          <div className="flex gap-6 animate-slide-right cursor-default">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 w-[520px] max-[769px]:w-[400px] flex-shrink-0"
              >
                <div className="flex justify-between items-center">
                  <div className="textcolor text-4xl font-bold"><FaQuoteLeft className="text-green-700"/></div>
                  <div className=" flex text-yellow-400">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={starIndex < Math.floor(testimonial.rating) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.207 6.794a1 1 0 00.95.69h7.145c.969 0 1.371 1.24.588 1.81l-5.788 4.209a1 1 0 00-.364 1.118l2.207 6.794c.3.921-.755 1.688-1.539 1.118l-5.788-4.209a1 1 0 00-1.175 0l-5.788 4.209c-.784.57-1.839-.197-1.539-1.118l2.207-6.794a1 1 0 00-.364-1.118L2.32 11.221c-.783-.57-.381-1.81.588-1.81h7.145a1 1 0 00.95-.69l2.207-6.794z"
                      />
                    </svg>
                  ))}
                </div>
                </div>
                <p className="text-[#667085] text-[16px] mt-4 max-[769px]:text-[14px]">{testimonial.text}</p>
                <div className="mt-6 flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border border-gray-200"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
