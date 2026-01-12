import React, { useState } from "react";
import Modal from "react-modal";
import API from "../api/api";

Modal.setAppElement("#root");

const EventFormModal = ({ closeModal, event }) => {
  const [form, setForm] = useState({
    title: event?.title || "",
    date: event?.date || "",
    time: event?.time || "",
    fee: event?.fee || "",
  });
  const [eventImage, setEventImage] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append("date", form.date);
    data.append("time", form.time);
    data.append("fee", form.fee);

    if (eventImage) data.append("eventImage", eventImage);
    if (qrImage) data.append("qrImage", qrImage);

    try {
      if (event) {
        await API.put(`/events/${event._id}`, data);
      } else {
        await API.post("/events", data);
      }
      closeModal();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal} // allows Esc and outside click
      className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 max-w-3xl w-full mx-auto mt-16 shadow-2xl scale-95 animate-scaleIn max-h-[85vh] overflow-y-auto focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute top-5 right-5 text-gray-500 hover:text-gray-900 text-3xl font-bold z-50"
      >
        ✖
      </button>

      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-6 text-center drop-shadow-md">
        {event ? "Edit Event" : "Add Event"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-40">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />
        <input
          type="number"
          name="fee"
          value={form.fee}
          onChange={handleChange}
          required
          className="border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />

        <label className="flex flex-col gap-1">
          Event Image:
          <input
            type="file"
            accept="image/*"
            onChange={e => setEventImage(e.target.files[0])}
            className="border p-2 rounded"
          />
        </label>
        <label className="flex flex-col gap-1">
          QR Image:
          <input
            type="file"
            accept="image/*"
            onChange={e => setQrImage(e.target.files[0])}
            className="border p-2 rounded"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
        >
          {loading ? "Saving..." : "Save Event"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-6 text-center relative z-40">
        Developed & Designed by Arpan Bera | Batch of 2026 CSE
      </p>
    </Modal>
  );
};

export default EventFormModal;
