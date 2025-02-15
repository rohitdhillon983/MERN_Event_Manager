import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toast } from "react-toastify";
import { FaEye ,FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token: urlToken } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://mern-event-manager-4eut.onrender.com/api/auth/reset-password/${urlToken}`, formData);
      navigate("/login"); // Redirect to the Login
      toast.success("Password reset successfully.");
      setLoading(false);
    } catch (err) {
      console.error("Error Create new password:", err);
      toast.error(err," Please try again.");
      setLoading(false);
    }
    setFormData({ password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#64f77355]  via-[#baf5c055] to-white">
      <div className="flex justify-center items-center gap-2 w-[80%] ">
        {/* left section */}
        <div className="w-1/2 flex justify-center items-center">
        <DotLottieReact
            src="https://lottie.host/6977a354-bb8f-445e-87b5-5ac693801eee/lqVnLrP5sr.lottie"
            loop
            autoplay
            className="min-w-[700px]"
          />
        </div>

        {/* right section */}
        <div className="bg-[#ffffff67] border-2 border-[#8f8f8f4c] p-8 rounded-lg shadow-lg w-1/2 mx-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create new password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 relative left-2">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={formData.password}
              placeholder="Enter New Password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg outline-none border-[#8f8f8f] focus:ring-2 focus:ring-green-600"
              required
            />
            <div className="absolute right-3 top-8 text-xl">
              {showPassword ? (
                <button onClick={() => setShowPassword(false)}> <FaEyeSlash /> </button>
                ) : (
                <button onClick={() => setShowPassword(true)}> <FaEye /> </button>
                )}
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 relative left-2"> Confirm Password</label>
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              value={formData.confirmPassword}
              placeholder="Enter confirm password"
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg outline-none border-[#8f8f8f] focus:ring-2 focus:ring-green-600"
              required
            />
            <div className="absolute right-3 top-8 text-xl">
              {showConfirmPassword ? (
                <button onClick={() => setShowConfirmPassword(false)}> <FaEyeSlash /> </button>
                ) : (
                <button onClick={() => setShowConfirmPassword(true)}> <FaEye /> </button>
                )}
            </div>
          </div>          
          <button
            type="submit" onClick={() => setLoading(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {Loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default ResetPassword;