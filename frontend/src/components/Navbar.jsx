import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUser, FaPhoneAlt } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdEventNote } from "react-icons/md";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(store => store.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white p-4 text-[#04270a] border-b-4 border-green-700 flex justify-between items-center fixed top-0 left-0 right-0 z-50 rounded-3xl mx-4 mt-2 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-[113%]"
      }`}
    >
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <Link to="/" className="overflow-hidden">
          <img src={logo} alt="" className="w-15"/>
        </Link>
        <div className="hidden md:flex space-x-4 justify-center items-center font-semibold">
          <Link
            to="/"
            className={` font-bold flex justify-center items-center gap-1 p-2 rounded-2xl px-3 ${
              isActive("/") ? "bg-green-600 text-green-100" : ""
            }`}
          >
            <FaHome />
            Home
          </Link>
          <Link
            to="/events"
            className={` font-bold flex justify-center items-center gap-1 p-2 rounded-2xl px-3 ${
              isActive("/events") ? "bg-green-600 text-green-100" : ""
            }`}
          >
            <MdEventNote />
            Events
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={` font-bold flex justify-center items-center gap-1 p-2 rounded-2xl px-3 ${
                  isActive("/dashboard") ? "bg-green-600 text-green-100" : ""
                }`}
              >
                <FaUser />
                Dashboard
              </Link>
              <Link
                to="/contact" 
                className={` font-bold flex justify-center items-center gap-1 p-2 rounded-2xl px-3 ${
                  isActive("/contact") ? "bg-green-600 text-green-100 " : ""
                }`}
              >
                <FaPhoneAlt />
                ContactUs
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white font-bold flex justify-center items-center gap-1 bg-green-600 px-4 py-2 rounded-3xl"
            >
              Login
              <LuLogIn />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-green-700 focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-green-600 text-white mt-2 py-4 rounded-2xl absolute top-10 right-0 w-full">
          <Link
            to="/"
            className={`block px-4 py-2 hover:bg-green-700 transition duration-300 ${
              isActive("/") ? "bg-green-700 text-white" : ""
            }`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`block px-4 py-2 hover:bg-green-700 transition duration-300 ${
              isActive("/events") ? "bg-green-700 text-white" : ""
            }`}
            onClick={toggleMenu}
          >
            Events
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`block px-4 py-2 hover:bg-green-700 transition duration-300 ${
                  isActive("/dashboard") ? "bg-green-700 text-white" : ""
                }`}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/contact" // Make sure this route is correct
                className={`block px-4 py-2 hover:bg-green-700 transition duration-300 ${
                  isActive("/contact") ? "bg-green-700 text-white" : ""
                }`}
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-green-100 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-green-700 transition duration-300"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;