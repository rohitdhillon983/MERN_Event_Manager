import React from 'react'
import { FaArrowRight } from "react-icons/fa6";


const Services = () => {
       
  return (
    <section className=" mx-auto flex flex-col items-center py-9 bg-[#f4f3f3]">
      <p className='text-green-700 text-[14px]'>WELCOME TO EVENTHUB.COM</p>
      <h2 className="text-[38px] max-[426px]:text-[24px] font-bold leading-[35.4px] tracking-[0.16px] text-center py-3">The simplest way to host all your events</h2>
       <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-10/12 my-10'>

        {/* box 1 */} 
        <div className='p-10 rounded-2xl bg-gradient-to-bl from-[#42023c] via-[#052546] to-[#42023c] flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold text-white'>In-Person Events</h1>
          <h3 className='text-gray-400 text-xl'>Keep it all together at the venue</h3>
          <video className="w-full h-auto px-4 mt-12" autoPlay loop >
            <source src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/inperson-event.webm" type="video/mp4" loop/>
            Your browser does not support the video tag.
          </video>
        </div>

        {/* box 2 */}
        <div className='p-10 rounded-2xl bg-gradient-to-b from-[#0ebef8] via-[#134b83] to-[#0ebef8] flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold text-white'>Virtual events</h1>
          <h3 className='text-gray-400 text-xl text-center'>Go beyond webinars and workshops</h3>
          <video className="w-full h-auto px-4 mt-12" autoPlay loop >
            <source src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/virtual-event.webm" type="video/mp4" loop/>
            Your browser does not support the video tag.
          </video>
        </div>

        {/* box 3*/}
        <div className='p-10 rounded-2xl bg-gradient-to-bl from-[#f09cf6] via-[rgb(250,104,241)] to-[#9370fd] flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold '>Hybrid events</h1>
          <h3 className='text-gray-800 text-xl text-center'>Merge the physical with the virtual</h3>
          <video className="w-full h-auto px-4 mt-12" autoPlay loop >
            <source src="https://www.zohowebstatic.com/sites/zweb/images/backstage/home/hybrid-event.webm" type="video/mp4" loop/>
            Your browser does not support the video tag.
          </video>
        </div>
       </div>
      
    </section>
  )
}

export default Services
