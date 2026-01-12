import React from "react";

const Contact = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 text-white overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,white,transparent_70%)] opacity-10"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Get in <span className="text-yellow-400">Touch</span>
        </h2>

        <p className="text-gray-300 text-lg mb-10">
          Have questions about events, registration, or sponsorships?
          <br />
          We’re here to help you.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition">
            <p className="text-3xl mb-2">📧</p>
            <p className="text-lg font-semibold">Email</p>
            <p className="text-gray-300 mt-1">
              sportsfest@college.edu
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transition">
            <p className="text-3xl mb-2">📞</p>
            <p className="text-lg font-semibold">Phone</p>
            <p className="text-gray-300 mt-1">
              +91 9732760714
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
