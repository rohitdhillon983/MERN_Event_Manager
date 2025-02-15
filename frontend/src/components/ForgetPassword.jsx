import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: ""});
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://mern-event-manager-4eut.onrender.com/api/auth/forget-password", formData);
      localStorage.setItem("token", res.data.token); // Store the token
      setLoading(false);
      toast.success("Mail sending successfully.");

    } catch (err) {
      console.error("Error to send mail:", err);
      setLoading(false);
      toast.error("Mail sending failed. Please try again.");
    }
    setFormData({ email: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#64f77355]  via-[#baf5c055] to-white">
      <div className="flex justify-center items-center gap-2 w-[80%] mt-10 max-[426px]:mt-20 max-[769px]:mt-24 mb-2">
        {/* left section */}
        <div className="w-1/2 flex justify-center items-center max-[426px]:hidden">
        <DotLottieReact
            src="https://lottie.host/01e5a8d9-4229-4e5e-bb9f-b637b279810c/BSD5ouiZN6.lottie"
            loop
            autoplay
            className="min-w-[700px] max-[769px]:min-w-[800px]"
          />
        </div>

        {/* right section */}
        <div className="bg-[#ffffff67] border-2 border-[#8f8f8f4c] p-8 rounded-lg shadow-lg w-1/2 max-[769px]:w-full max-[769px]:mx-0 mx-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 relative left-2">Email</label>
            <input
              type="email"
              value={formData.email}
              placeholder="Your email address"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg outline-none border-[#8f8f8f] focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
             
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {Loading ? "Sending..." : "Send Verification code"}
            
          </button>
          <p className="text-center mt-4 text-gray-600">remember your password? <Link to="/login" className="text-green-600">Login</Link></p>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default ForgetPassword;