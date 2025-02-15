import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import user from "../../assets/New folder/user.png";

const ManagementTeam = () => {
  const testimonials = [
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Manu Viswam",
      position: "President and CEO, PrintReach, USA",
      image: "https://swissmote.com/_next/image?url=https%3A%2F%2Fswissmote.adistrim.in%2Fmedia%2Fcandiate%2Fimages%2Fmanu-viswam-profile.JPG&w=2048&q=75", 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Aliya Sheikh",
      position: "Digital Marketing Expert, PrintReach, USA",
      image: "https://swissmote.com/_next/image?url=https%3A%2F%2Fswissmote.adistrim.in%2Fmedia%2Fcandiate%2Fimages%2Fphoto_2025-01-01_03.04.42.jpeg&w=2048&q=75", 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Tarak Maniar",
      position: "Pre-Wedding Planner, PrintReach, USA",
      image: "https://swissmote.com/_next/image?url=https%3A%2F%2Fswissmote.adistrim.in%2Fmedia%2Fcandiate%2Fimages%2Ftarak-maniar-profile.jpg&w=2048&q=75", 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Mohadmed Rahul",
      position: "Marketing Manager, PrintReach, USA",
      image: "https://swissmote.com/_next/image?url=https%3A%2F%2Fswissmote.adistrim.in%2Fmedia%2Fcandiate%2Fimages%2Fmohadmed-rahul.jpg&w=2048&q=75", 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Chris",
      position: "President and CEO, PrintReach, USA",
      image: user, 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Rohit Dillon",
      position: "Event Manager, PrintReach, USA",
      image: "https://rohit-dhillon.netlify.app/assets/my-DpkNs6wg.png", 
      rating: 4.5,
    },
    {
      text: "Ut enim ad minim veniam, occaecat cupidatat non proident.",
      name: "Sumit sharma",
      position: "Senior Manager, PrintReach, USA",
      image: "https://st4.depositphotos.com/2208684/30213/i/450/depositphotos_302139812-stock-photo-portrait-shot-smiling-businessman-wearing.jpg", 
      rating: 4.5,
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  return (
    <div className="bg-[#f2f2f2] py-12 overflow-hidden">
      <div className="container mx-auto px-4">
      <h2 className="text-[14px] leading-9 tracking-[0.16px] font-bold text-center text-green-700">Explore Our Team</h2>
        <h2 className="text-4xl font-semibold text-center max-[769px]:text-3xl max-[426px]:text-2xl">
          Expert Management Team for Your Success 
        </h2>
        <div className="mt-8 relative">
          {/* Testimonials container */}
          <div className="flex gap-6 animate-slide-right cursor-default">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-green-800 via-green-400 to-green-50 rounded-2xl shadow-lg p-6 w-[320px] max-[769px]:w-[250px] flex-shrink-0 ">

                <div className="flex items-center w-full rounded-2xl overflow-hidden">
                    <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-[300px] max-[769px]:h-[150px] object-cover"
                  />
                </div>

                <div className="my-7">
                    <h3 className="font-semibold text-[#0a4406e1] text-2xl max-[769px]:text-xl">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#0a4406e1] text-sm ">{testimonial.position}</p>
                  </div> 

                <p className="text-[#256a31ef] text-[16px] mt-4">{testimonial.text}</p>
                               
                               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementTeam
