import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => go("/")}
        >
          <img
            src="/logo.jpeg"   // ✅ from public folder
            alt="Kreedakriti Logo"
            className="h-20 w-auto object-contain"
          />
          {/* <span
            className={`font-extrabold text-xl hidden sm:block ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Kreedakriti
          </span> */}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 items-center">
          {["/", "/events", "/about", "/contact"].map((path, i) => (
            <button
              key={i}
              onClick={() => go(path)}
              className={`hover:text-gray-300 transition ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {path === "/"
                ? "Home"
                : path.replace("/", "").charAt(0).toUpperCase() +
                  path.slice(2)}
            </button>
          ))}

          <button
            onClick={() => go("/admin/login")}
            className="bg-yellow-400 text-black px-4 py-1 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Admin
          </button>
        </div>

        {/* HAMBURGER */}
        <button
          className={`md:hidden text-3xl ${
            scrolled ? "text-black" : "text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div
          className={`md:hidden px-4 pb-4 space-y-3 ${
            scrolled ? "bg-white/30 backdrop-blur-md" : "bg-blue-700"
          }`}
        >
          <button onClick={() => go("/")} className="block w-full text-left">
            Home
          </button>
          <button onClick={() => go("/events")} className="block w-full text-left">
            Events
          </button>
          <button onClick={() => go("/about")} className="block w-full text-left">
            About
          </button>
          <button onClick={() => go("/contact")} className="block w-full text-left">
            Contact
          </button>

          <button
            onClick={() => go("/admin/login")}
            className="w-full bg-yellow-400 text-black py-2 rounded-lg font-bold"
          >
            Admin Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
