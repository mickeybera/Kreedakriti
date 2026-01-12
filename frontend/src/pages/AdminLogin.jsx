import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../api/api";
import API from "../api/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-300">
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-bounceIn">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-900 drop-shadow-md">
          🏆 Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>
        )}

        {/* Optional small footer */}
        <p className="text-gray-600 text-sm mt-6 text-center">
          Developed & Designed by Arpan Bera | Batch of 2026 CSE
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
