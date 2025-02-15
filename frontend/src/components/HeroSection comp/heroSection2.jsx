import React, { useEffect } from 'react';
import "flowbite";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import eventVideo from "../../assets/eventVideo.mp4";
import img1 from "../../assets/events/img1.jpg";
import img2 from "../../assets/events/img2.jpg";
import img3 from "../../assets/events/img3.jpg";
import img4 from "../../assets/events/img4.jpg";

const HeroSection2 = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Initialize the carousel after the component renders
        // const carousel = new window.Carousel(document.getElementById('default-carousel'));
      }, []);
  return (
    <div className="relative min-h-screen flex items-center gap-5 justify-center w-11/12 mx-auto max-[426px]:flex-col">
      {/* Background Image Carousel */}

    <div className='w-1/2 max-[426px]:full relative rounded-2xl overflow-hidden'> 
      <div className='absolute top-0 left-0 bg-gradient-to-br from-[#0f0f0fc9] via-[#0f0f0fa7] to-[#000000e2] w-full h-full'></div>
      <video className='w-full h-full object-cover' autoPlay loop muted>
        <source src={eventVideo} type="video/mp4" />
      </video>

    </div>
      {/* Content Overlay */}
      <div className="relative z-10 p-4 bg-opacity-50 rounded-lg w-1/2 max-[426px]:w-full">
        <h1 className="text-4xl max-[769px]:text-3xl max-[426px]:text-2xl font-bold mb-4">UNLOCK YOUR DREAM DESTINATION EVENT WITH <span className='text-green-700'>EVENTHUB.COM</span></h1>
        <p className="mb-6 text-gray-600">
        Looking for the Best Virtual Event Platform in the market? Ranked #1 Momentum Leader among Top Virtual Event Platforms on G2, the ibentos Virtual Event Software is all that your business needs to host world class virtual & hybrid events. <br /> An all-in-one virtual event platform, built of features that drive ROI, so that you can host any type of event- global virtual conference, a large exhibition, an award show, an education fair, a career fair, or a fascinating product launch- with ease.
        </p>

        <div className='flex gap-4'> 
            <Link to={'/events'} className="button flex justify-center items-center gap-4" >
                Let's Explore <FaArrowRightLong />
            </Link>
            <Link to={'/contact'}>
                <p className="border-2 border-green-700 text-green-700 px-4 py-1 rounded-4xl font-bold flex justify-center items-center">Contact us</p>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection2;