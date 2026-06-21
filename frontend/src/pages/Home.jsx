// pages/Home.jsx
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiDroplet, FiWind, FiMapPin } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Globe from "../components/Globe";
import Footer from "../components/Footer";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLocationSelect = async ({ lat, lng }) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/weather", { params: { lat, lon: lng } });
      setWeather(res.data);
    } catch (err) {
      setError("Unable to fetch weather for this location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)]">
      <Navbar />
      <Hero />

      <section id="globe" className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Click Anywhere on the Globe
        </h2>
        <p className="text-slate-400 mb-10">
          Get instant weather data for any location on Earth
        </p>
        <Globe onLocationSelect={handleLocationSelect} />

        {loading && <p className="text-cyan-400 mt-6">Fetching weather...</p>}
        {error && <p className="text-red-400 mt-6">{error}</p>}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 max-w-md mx-auto backdrop-blur-xl bg-white/5 border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10 text-left"
          >
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <FiMapPin />
              <h3 className="text-xl font-semibold text-white">
                {weather.city}
              </h3>
            </div>
            <p className="text-5xl font-bold text-white mt-4">
              {weather.temperature}°C
            </p>
            <p className="text-slate-400 mt-1">{weather.condition}</p>

            <div className="flex justify-between mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center gap-2 text-slate-300">
                <FiDroplet className="text-cyan-400" />
                <span>{weather.humidity}% Humidity</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FiWind className="text-cyan-400" />
                <span>{weather.windSpeed} km/h</span>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <section className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Live Weather Maps",
            desc: "Visualize precipitation, temperature and wind patterns in real time.",
          },
          {
            title: "Global Coverage",
            desc: "Get accurate forecasts for any city or coordinate worldwide.",
          },
          {
            title: "Smart Dashboard",
            desc: "Personalized insights with a clean, premium dashboard experience.",
          },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-cyan-500/10 rounded-2xl p-6 hover:border-cyan-500/40 transition"
          >
            <h3 className="text-lg font-semibold text-white">{f.title}</h3>
            <p className="text-slate-400 mt-2 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready to explore the skies?
        </h2>

        <p className="text-slate-400 mt-3">
          Sign up now and unlock the full SkyCast dashboard.
        </p>

        <a
          href="/signup"
          className="inline-block mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold hover:opacity-90 transition"
        >
          Get Started
        </a>
      </section>

      <Footer />
    </div>
  );
}
