import React, { useEffect, useState } from "react";
import API from "../api/api";
import EventFormModal from "./EventFormModal";
import ParticipantsModal from "../components/ParticipantsModal";
import { FaUsers, FaMoneyBillWave, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      const eventsWithStats = await Promise.all(
        res.data.map((event) => {
          return API.get(`/registrations/event/${event._id}`)
            .then((regsRes) => {
              const registrations = regsRes.data || [];
              const totalAmount = registrations.reduce(
                (sum, r) => sum + (Number(r.amountPaid) || 0),
                0
              );
              return {
                ...event,
                registrationsCount: registrations.length,
                totalAmount,
              };
            })
            .catch(() => ({ ...event, registrationsCount: 0, totalAmount: 0 }));
        })
      );
      setEvents(await Promise.all(eventsWithStats));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6 min-h-screen p-8 bg-gradient-to-r from-blue-100 to-blue-200">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 md:mb-0">
          🏆 Admin Dashboard
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white px-5 py-2 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            + Add Event
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin/login";
            }}
            className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-5 py-2 rounded-xl shadow-lg transform hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* EVENT CARDS */}
      {events.length === 0 ? (
        <div className="mt-20 text-center text-gray-600">
          <p className="text-2xl font-bold mb-2">No Events Found!</p>
          <p className="text-lg">Create your first sports event and let the fun begin! 🏅</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="relative bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-5 rounded-2xl shadow-2xl flex flex-col justify-between transform hover:scale-105 transition-all duration-300"
            >
              {/* Top badge */}
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-lg">
                ₹{event.fee}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <p className="flex items-center gap-2">
                  <FaUsers className="text-white/80" /> {event.registrationsCount || 0} Registrations
                </p>
                <p className="flex items-center gap-2 mt-1">
                  <FaMoneyBillWave className="text-white/80" /> ₹{event.totalAmount || 0} Collected
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowForm(true);
                  }}
                  className="hover:cursor-pointer flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded-md font-bold shadow-md transform hover:scale-105 transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="hover:cursor-pointer flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md font-bold shadow-md transform hover:scale-105 transition"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowParticipants(true);
                  }}
                  className="hover:cursor-pointer flex items-center gap-1 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md font-bold shadow-md transform hover:scale-105 transition"
                >
                  <FaEye /> Participants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}
      {showForm && (
        <EventFormModal
          event={selectedEvent}
          closeModal={() => {
            setShowForm(false);
            setSelectedEvent(null);
            fetchEvents();
          }}
        />
      )}
      {showParticipants && selectedEvent && (
        <ParticipantsModal
          event={selectedEvent}
          onClose={() => {
            setShowParticipants(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
