import React from 'react';
import appStoreIcon from '../../assets/New folder/appStore.png'; 
import googlePlayIcon from '../../assets/New folder/playStore.png';
import Phone from '../../assets/New folder/Phone.png';

const AppDownloadSection = () => {
  return (
    <section className="bg-[#1C4670] text-white py-16 overflow-hidden h-[491px]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-[40%] text-center md:text-left max-[769px]:pl-4">
          <h2 className="text-[32px] font-extrabold leading-[40px] tracking-[0.16px] mb-4">Manage Your Services by Your Mobile Phone</h2>
          <p className="text-[16px] mb-6 leading-[26px] text-[#AAB5CD]">
            Download our app to manage and track your services. Our app enables you to stay in touch with our experts and aids you in tracking your progress.
          </p>
          <p className="text-[16px] leading-[28px] mb-4">Get the App</p>
          <div className="flex space-x-4">
            <a href="#" className="flex items-center border-2 border-[#A5C937] justify-center bg-white text-black rounded-lg px-4 py-2">
              <img src={appStoreIcon} alt="App Store" className="w-8 h-8 mr-2" />
              <p className='text-[11px] leading-[19px]'>Get it on <div className="font-semibold text-[14px] leading-[22px] tracking-[0]">App Store</div></p>
            </a>
            <a href="#" className="flex items-center border-2 border-[#A5C937] justify-center bg-white text-black rounded-lg px-4 py-2">
              <img src={googlePlayIcon} alt="Google Play" className="w-8 h-8 mr-2" />
              <p className='text-[11px] leading-[19px]'>Get it on <div className="font-semibold text-[14px] leading-[22px] tracking-[0]">Google Play</div></p>
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          {/* Mockup of two phones */}
          <div className="relative">
            <div className="absolute -top-80 -right-9 w-[3/4] h-2/3 bg-white rounded-lg shadow-lg max-[768px]:hidden"><img src={Phone} alt="" /></div>
            <div className="absolute -top-32 right-80 w-2/3 h-3/4 bg-white rounded-lg shadow-lg max-[769px]:hidden"><img src={Phone} alt="" /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;