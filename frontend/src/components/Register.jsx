import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {toast} from "react-toastify";
import { useDispatch } from "react-redux"
import { FaEye ,FaEyeSlash } from "react-icons/fa";

import { setSignupData } from "../slices/authSlice"
// import { sendOtp } from "../../../services/operations/authAPI"

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
    }

    dispatch(setSignupData(signupData))

    setLoading(true);
    try {
      await axios.post("https://mern-event-manager-4eut.onrender.com/api/auth/sendotp", {email:formData.email});
      navigate("/otp"); 
      setLoading(false);
      toast.success("OTP send successful");
    } catch (err) {
      console.error("Error registering:", err);
      setLoading(false);
      toast.error(err.response.data.message);
    }
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#64f77355]  via-[#baf5c055] to-white">
      <div className="flex justify-center items-center gap-2 w-[80%] mt-10 max-[426px]:mt-20 max-[769px]:mt-24 mb-2">
        {/* left section */}
        <div className="w-1/2 flex justify-center items-center max-[426px]:hidden">
        <DotLottieReact
            src="https://lottie.host/c9b6581d-0d91-44fa-8c54-342a2e00794d/HxvJxiFQMi.lottie"
            loop
            autoplay
            className="min-w-[900px] max-[769px]:min-w-[800px]"
          />
        </div>

        {/* right section */}
        <div className="bg-[#ffffff67] border-2 border-[#8f8f8f4c] p-8 rounded-lg shadow-lg w-1/2  max-[769px]:w-full max-[769px]:mx-0 mx-8">
        <h2 className="text-2xl font-bold mb-6 text-center">SignUp</h2>
        <form onSubmit={handleSubmit}>

        <div className="mb-4">
            <label className="block text-gray-700 relative left-2">Username</label>
            <input
              type="text"
              value={formData.username}
              placeholder="Enter username"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg outline-none border-[#8f8f8f] focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 relative left-2">Email</label>
            <input
              type="email"
              value={formData.email}
              placeholder="Enter email address"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg outline-none border-[#8f8f8f] focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div className="mb-8 relative">
            <label className="block text-gray-700 relative left-2">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={formData.password}
              placeholder="Enter your password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg outline-none border-[#8f8f8f] focus:ring-2 focus:ring-green-600"
              required
            />
            {/* Toggle password visibility */}
            <div className="absolute right-3 top-8 text-xl">
              {showPassword ? (
                <button onClick={() => setShowPassword(false)}> <FaEyeSlash /> </button>
              
              ) : (
                <button onClick={() => setShowPassword(true)}> <FaEye /> </button>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {Loading ? (
              <span className="animate-spin text-white">Loading...</span>
            ) : (
              "Sign up"
            )}
          </button>
          <p className="text-center mt-4 text-gray-600">Already have an account? <Link to="/login" className="text-green-600">Login</Link></p>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Register;