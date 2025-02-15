import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OTP = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const { signupData, loading } = useSelector((state) => state.auth);
  
  if(!signupData){
    navigate("/register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-event-manager-4eut.onrender.com/api/auth/register",{ otp, ...signupData });
      navigate("/login");
      toast.success("User registered successful");
      setLoading(false);
    } catch (err) {
      console.error("Error user registration:", err);
      setLoading(false);
      toast.error("user registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#64f77355]  via-[#baf5c055] to-white">
      <div className="flex justify-center items-center gap-2 w-[80%] mt-10 max-[426px]:mt-20 max-[769px]:mt-24 mb-2">
        {/* left section */}
        <div className="w-1/2 flex justify-center items-center max-[426px]:hidden">
        <DotLottieReact
            src="https://lottie.host/6977a354-bb8f-445e-87b5-5ac693801eee/lqVnLrP5sr.lottie"
            loop
            autoplay
            className="min-w-[700px] max-[769px]:min-w-[800px]"
          />
        </div>

        {/* right section */}
        <div className="bg-[#ffffff67] border-2 border-[#8f8f8f4c] p-8 rounded-lg shadow-lg w-1/2 max-[769px]:w-full max-[769px]:mx-0 mx-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter verification code</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4 flex justify-center">
            <OtpInput
                value={otp}
                onChange={setOtp}     
                numInputs={6}
                renderSeparator={<span>-</span>}
                // placeholder="-"
                renderInput={(props) => <input {...props} 
                style={{
                 
                  // background: "linear-gradient(120deg, #FFA229, #074907 60px)",
                  border: "2px solid #8f8f8f4c",
                }}
                className="w-[38px] lg:w-[40px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />}
                />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Verification
          </button>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default OTP;