import React from 'react'
import OracleLogo from '../../assets/New folder/busness/Vector.png'; 
import MorpheusLogo from '../../assets/New folder/busness/Group.png';
import SamsungLogo from '../../assets/New folder/busness/Group (1).png';
import MondayComLogo from '../../assets/New folder/busness/Group (3).png';
import SegmentLogo from '../../assets/New folder/busness/Group (4).png';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const Hero = () => {
      const logos = [
        { src: OracleLogo, alt: 'Oracle' },
        { src: MorpheusLogo, alt: 'Morpheus' },
        { src: MorpheusLogo, alt: 'Morpheus' }, 
        { src: SamsungLogo, alt: 'Samsung' },
        { src: MondayComLogo, alt: 'monday.com' },
        { src: SegmentLogo, alt: 'Segment' },
      ];
      const duplicatedlogo = [...logos, ...logos];

      const navigate = useNavigate();
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center relative">
      <div className="absolute top-0 left-0 w-full min-h-[150vh] main-container"></div>
      <div className="p-4 w-11/12 z-10 mt-24">
        <div className="flex flex-col justify-center items-center w-10/12 mx-auto my-10">
            <h1 class=" font-bold text-[12px] max-[426px]:text-[10px] mt-4 border-2 border-green-700 text-green-700 px-4 py-1 rounded-4xl bg-green-200">
                Welcome to EventHub.com
            </h1>
            <h2 class="text-gray-800 mt-2 text-5xl max-[769px]:text-3xl max-[426px]:text-2xl text-center font-bold ">Your One-Stop Destination for <span className='text-green-700'>Seamless</span> Event Planning!</h2>
            <p className='text-gray-600 text-center mt-4'>
                From intimate gatherings to grand celebrations, EventHub is your trusted partner in planning, organizing, and executing unforgettable events. Let’s turn your vision into reality—effortlessly and beautifully!            
            </p>
        </div>

        <div className="flex flex-col justify-center items-center w-full my-10">
            <button onClick={() => navigate('/events')} className='button flex justify-center items-center gap-4 '>Get Started <FaArrowRightLong /></button>
        </div>
        <div>
        <section className=" flex items-center justify-center  bg-green-100 rounded-full  mt-20 overflow-hidden">
        <div className="container text-center flex flex-col gap-[39px]">
            {/* <p className=" text-[#272D37] font-bold text-[22px] mb-4">Trusted By Over 100+ Startups and freelance business</p> */}
            <div className="flex flex-wrap justify-center gap-4 py-5 animate-slide-right">
            {duplicatedlogo.map((logo, index) => (
                <img key={index} src={logo.src} alt={logo.alt} className="h-[17.83px] mr-[49.56px]" />
            ))}
            </div>
        </div>
        </section>
      </div>
      </div>
      
    </div>
  )
}

export default Hero
