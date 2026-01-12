import React, { useState } from "react";
import RegistrationModal from "./RegistrationModal";

const EventCard = ({ event }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:-translate-y-2 hover:shadow-yellow-400/30 transition-all duration-300">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition"></div>

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.eventImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative p-5 text-center">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            {event.title}
          </h2>

          <p className="mt-1 text-sm text-gray-200">
            🗓 {event.date} &nbsp; | &nbsp; ⏰ {event.time}
          </p>

          <p className="mt-2 text-lg font-bold text-yellow-400">
            ₹ {event.fee}
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold text-lg hover:from-yellow-300 hover:to-orange-300 hover:scale-105 transition"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {openModal && (
        <RegistrationModal
          event={event}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default EventCard;

