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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/registrations", {
        eventId: event._id,
        ...formData,
      });

      setMessage("🎉 Registration successful!");
      setShowSuccess(true);

      setFormData({
        studentName: "",
        phone: "",
        transactionId: "",
        amountPaid: event.fee,
      });

      setTimeout(() => {
        setShowSuccess(false);
        closeModal();
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error occurred");
    }
    setLoading(false);
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="
        bg-white/95 backdrop-blur-xl 
        rounded-3xl 
        max-w-6xl w-[95%]
        mx-auto 
        mt-20 
        relative 
        shadow-2xl 
        p-10 
        animate-scaleIn
      "
      overlayClassName="
        fixed inset-0 
        bg-black/60 
        flex justify-center items-start 
        backdrop-blur-sm
        z-40
      "
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={closeModal}
        className="absolute top-5 right-6 text-gray-600 hover:text-gray-900 text-3xl transition"
      >
        ✖
      </button>

      {/* TITLE */}
      <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">
        {event.title} Registration
      </h2>

      {/* QR CODE */}
      <div className="flex justify-center mb-8">
        <img
          src={event.qrImage}
          alt="QR Code"
          className={`w-52 h-52 rounded-xl shadow-xl border-2 border-indigo-300 ${
            qrBounce ? "animate-bounceOnce" : ""
          }`}
        />
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="studentName"
          placeholder="Full Name"
          value={formData.studentName}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 col-span-2"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="transactionId"
          placeholder="Transaction ID"
          value={formData.transactionId}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="amountPaid"
          placeholder="Amount Paid"
          value={formData.amountPaid}
          onChange={handleChange}
          required
          className="border border-indigo-300 p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="
            bg-indigo-600 text-white 
            px-8 py-4 
            rounded-full 
            font-bold 
            hover:bg-indigo-700 
            transition 
            transform hover:scale-105 
            col-span-2
          "
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </form>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-xl shadow-xl animate-fadeInOut z-50">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {!showSuccess && message && (
        <p className="mt-6 text-center font-semibold text-red-600 animate-fadeInOut">
          {message}
        </p>
      )}
    </Modal>
  );
};

export default RegistrationModal;

