import React, { useEffect, useState } from "react";
import API from "../api/api";
import EventCard from "../components/EventCard";
import Hero from "../components/Hero";
import About from "../components/About";
import Contact from "../components/Contact";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-800 text-white">
      <Hero />
      <section className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </section>
      <About />
      <Contact />
    </div>
  );
};

export default Home;
