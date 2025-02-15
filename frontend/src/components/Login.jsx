import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toast } from "react-toastify";
import { FaEye ,FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector} from 'react-redux';
import { setUser } from "../slices/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post("https://mern-event-manager-4eut.onrender.com/api/auth/login", formData);
      localStorage.setItem("token", res.data.token); // Store the token
      dispatch(setUser(res.data.user));
      toast.success("Login successful");
      setLoading(false);
      navigate("/"); // Redirect to the OTP verification page
    } catch (err) {
      console.error("Error logging in:", err);
      setLoading(false);
      toast.error("Login failed. Please try again.");
    }
    setFormData({ email: "", password: "" });
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          <div className="mb-1 relative">
            <label className="block text-gray-700 relative left-2">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={formData.password}
              placeholder="Enter your password"
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
          <p className="mb-6 text-gray-600 relative left-2"><Link to="/forget-password">Forgot Password ?</Link></p>
          
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            {Loading ? "Loading..." : "Login"}
          </button>
          <p className="text-center mt-4 text-gray-600">Don't have an account? <Link to="/register" className="text-green-600">Register</Link></p>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Login;