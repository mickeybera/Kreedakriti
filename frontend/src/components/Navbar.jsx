import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false); // close menu after click
  };

  // Detect scroll to add glass effect / shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/20 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="font-extrabold text-xl cursor-pointer text-white md:text-white"
          onClick={() => go("/")}
        >
          🏆 Sports Fest
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center hover:cursor-pointer">
          <button
            onClick={() => go("/")}
            className={`hover:text-gray-300 transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => go("/events")}
            className={`hover:text-gray-300 transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => go("/about")}
            className={`hover:text-gray-300 transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            About
          </button>
          <button
            onClick={() => go("/contact")}
            className={`hover:text-gray-300 transition ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => go("/admin/login")}
            className="bg-yellow-400 text-black hover:cursor-pointer px-4 py-1 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Admin
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          className={`md:hidden text-3xl focus:outline-none ${
            scrolled ? "text-black" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden px-4 pb-4 space-y-3 transition-all ${
            scrolled ? "bg-white/30 backdrop-blur-md" : "bg-blue-700"
          }`}
        >
          <button onClick={() => go("/")} className="block w-full text-left">
            Home
          </button>
          <button
            onClick={() => go("/events")}
            className="block w-full text-left"
          >
            Events
          </button>
          <button
            onClick={() => go("/about")}
            className="block w-full text-left"
          >
            About
          </button>
          <button
            onClick={() => go("/contact")}
            className="block w-full text-left"
          >
            Contact
          </button>

          <button
            onClick={() => go("/admin/login")}
            className="hover:cursor-pointer w-full bg-yellow-400 text-black py-2 rounded-lg font-bold"
          >
            Admin Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
