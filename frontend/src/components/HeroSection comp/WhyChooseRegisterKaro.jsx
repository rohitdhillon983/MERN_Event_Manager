import React from 'react';
import symbol from "../../assets/New folder/whyChoose/symbol.png";
import symbol1 from "../../assets/New folder/whyChoose/symbol-1.png";
import symbol2 from "../../assets/New folder/whyChoose/symbol-2.png";
import symbol3 from "../../assets/New folder/whyChoose/symbol-3.png";
import symbol4 from "../../assets/New folder/whyChoose/symbol-4.png";

const WhyChooseRegisterKaro = () => {
 
  return (
    <div className="bg-white py-16 px-6 md:px-12">
      <div className="mx-auto text-center">
        {/* Heading Section */}
        
        {/* Features Section */}
        <div className="flex flex-wrap gap-6 justify-end pr-10">
          <div className="w-[558px] text-left flex flex-col justify-center">
            <p className="text-green-700 font-semibold mb-2">
              Why EventHub.com
            </p>
            <h2 className="text-3xl md:text-3xl font-bold mb-4">
               Why Choose EventHub
            </h2>
            <p className="text-[#0D1216] text-[15px]">
              It is with consistent services and results that build trust with the
              people and that in turn help us to serve the business better.
            </p>
          </div>

          {/* Feature 1 */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center w-[288px]">
            <div className="flex items-center justify-center mb-4">
              <div className=" text-white w-12 h-12 flex items-center justify-center rounded-full">
               <img src={symbol} alt="" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Confidential & Safe</h3>
            <p className="text-gray-500">
              All your private information is safe with us.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center w-[288px]">
            <div className="flex items-center justify-center mb-4">
              <div className="text-white w-12 h-12 flex items-center justify-center rounded-full">
               <img src={symbol1} alt="" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">No Hidden Fee</h3>
            <p className="text-gray-500">
              Everything is put before you with no hidden charges or conditions.
            </p>
          </div>
          {/* <br /> */}

          {/* Feature 3 */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center w-[288px]">
            <div className="flex items-center justify-center mb-4">
              <div className=" text-white w-12 h-12 flex items-center justify-center rounded-full">
                <img src={symbol2} alt="" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Guaranteed Satisfaction</h3>
            <p className="text-gray-500">
              We ensure that you stay 100% satisfied with our offered services.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-pink-50 border border-pink-100 rounded-lg p-6 text-center w-[288px]">
            <div className="flex items-center justify-center mb-4">
              <div className=" text-white w-12 h-12 flex items-center justify-center rounded-full">
                <img src={symbol3} alt="" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Expert CA/CS Assistance</h3>
            <p className="text-gray-500">
              Prompt support from our in-house expert professionals.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center w-[288px]">
            <div className="flex items-center justify-center mb-4">
              <div className=" text-white w-12 h-12 flex items-center justify-center rounded-full">
                <img src={symbol4} alt="" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Confidential & Safe</h3>
            <p className="text-gray-500">
              All your private information is safe with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseRegisterKaro;