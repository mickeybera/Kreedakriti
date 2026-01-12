import React from "react";

const About = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white,transparent_70%)] opacity-10"></div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            About <span className="text-yellow-400">Sports Fest</span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            College Sports Fest is not just a tournament — it’s a celebration of
            passion, teamwork, discipline, and sportsmanship.
            <br /><br />
            Athletes from across colleges compete, inspire, and create memories
            that last a lifetime. From intense matches to roaring crowds,
            Sports Fest brings the campus alive.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: "Events", value: "20+" },
            { label: "Participants", value: "1000+" },
            { label: "Colleges", value: "30+" },
            { label: "Days", value: "5" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition"
            >
              <p className="text-3xl font-extrabold text-yellow-400">
                {item.value}
              </p>
              <p className="text-sm text-gray-200 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
