import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const balls = [
  { emoji: "⚽", left: "20%", duration: 3 },
  { emoji: "🏀", left: "50%", duration: 4 },
  { emoji: "🎾", left: "35%", duration: 3.5 },
  { emoji: "🏐", left: "70%", duration: 4.2 },
  { emoji: "🥎", left: "10%", duration: 3.8 },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 text-white overflow-hidden">

      {/* Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent_60%)]"
      />

      {/* Multiple Rolling Balls */}
      {balls.map((ball, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -120, rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", rotate: 720, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: ball.duration,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: Math.random() * 3, // random delay between repeats
          }}
          className="absolute text-5xl z-20"
          style={{ left: ball.left }}
        >
          {ball.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-6">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide"
        >
          The Ultimate{" "}
          <span className="text-yellow-400">College Sports Fest</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-200"
        >
          Compete. Celebrate. Conquer.  
          Register now and be part of the biggest sports festival of the year.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => navigate("/events")}
            className="px-8 py-3 rounded-full bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 hover:scale-105 transition shadow-lg"
          >
            View Events
          </button>

          <button
            onClick={() => navigate("/events")}
            className="px-8 py-3 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black hover:scale-105 transition"
          >
            Register Now
          </button>
        </motion.div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-t-[50%]"></div>
    </section>
  );
};

export default Hero;
