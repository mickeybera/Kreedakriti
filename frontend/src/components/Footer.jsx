import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 text-white py-10 overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,white,transparent_70%)] opacity-10"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center space-y-4">
        <h3 className="text-2xl font-extrabold tracking-wide">
          🏆 College Sports Fest
        </h3>

        <p className="text-gray-300 text-sm">
          © 2026 College Sports Fest. All rights reserved.
        </p>

        <p className="text-gray-400 text-sm">
          Designed & Developed by{" "}
          <span className="text-yellow-400 font-semibold">
            Arpan Bera
          </span>{" "}
          <span className="block sm:inline">
            | Batch of 2026 | CSE
          </span>
        </p>

        {/* Optional Social Icons */}
        <div className="flex justify-center gap-4 mt-4 text-xl">
          <span className="cursor-pointer hover:text-yellow-400 transition">🏀</span>
          <span className="cursor-pointer hover:text-yellow-400 transition">⚽</span>
          <span className="cursor-pointer hover:text-yellow-400 transition">🏏</span>
          <span className="cursor-pointer hover:text-yellow-400 transition">🏐</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
