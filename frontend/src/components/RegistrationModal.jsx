import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import API from "../api/api";

Modal.setAppElement("#root");

const RegistrationModal = ({ event, closeModal }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    transactionId: "",
    amountPaid: event.fee,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [qrBounce, setQrBounce] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setQrBounce(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/registrations", { eventId: event._id, ...formData });
      setMessage("🎉 Registration successful!");
      setShowSuccess(true);

      // Reset form
      setFormData({ studentName: "", phone: "", transactionId: "", amountPaid: event.fee });

      // Auto-close success popup after 3s
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error occurred");
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-4xl mx-auto mt-16 relative shadow-2xl p-8 animate-scaleIn"
      overlayClassName="fixed inset-0 bg-black/60 flex justify-center items-start backdrop-blur-sm"
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl transition"
      >
        ✖
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        {event.title} Registration
      </h2>

      {/* QR CODE */}
      <div className="flex justify-center mb-6">
        <img
          src={event.qrImage}
          alt="QR Code"
          className={`w-48 h-48 rounded-lg shadow-lg border border-indigo-300 ${
            qrBounce ? "animate-bounceOnce" : ""
          }`}
        />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="studentName"
          placeholder="Full Name"
          value={formData.studentName}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition col-span-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
        />
        <input
          type="number"
          name="amountPaid"
          placeholder="Amount Paid"
          value={formData.amountPaid}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition transform hover:scale-105 col-span-2 mt-2"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeInOut z-50">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {!showSuccess && message && (
        <p className="mt-4 text-center font-medium text-red-600 animate-fadeInOut">
          {message}
        </p>
      )}
    </Modal>
  );
};

export default RegistrationModal;
