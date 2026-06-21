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
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[120px]" />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        <section
          id="globe"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-4"
          >
            Click Anywhere on the Globe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 mb-14 text-base md:text-lg max-w-2xl mx-auto"
          >
            Get instant weather data for any location on Earth
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto rounded-3xl p-4 sm:p-6 md:p-8 bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-[0_0_60px_-15px_rgba(34,211,238,0.15)]"
          >
            <Globe onLocationSelect={handleLocationSelect} />
          </motion.div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mt-10"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <p className="text-cyan-400 text-sm font-medium tracking-wide">
                Fetching weather...
              </p>
            </motion.div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 mt-10 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 inline-block"
            >
              {error}
            </motion.p>
          )}

          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-14 max-w-md mx-auto backdrop-blur-2xl bg-white/[0.04] border border-cyan-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_-12px_rgba(34,211,238,0.25)] text-left hover:border-cyan-500/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 text-cyan-400 mb-3">
                <FiMapPin className="text-lg" />
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  {weather.city}
                </h3>
              </div>
              <p className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent mt-4 leading-none">
                {weather.temperature}°C
              </p>
              <p className="text-slate-400 mt-3 text-base">
                {weather.condition}
              </p>

              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="p-2.5 rounded-lg bg-cyan-500/10">
                    <FiDroplet className="text-cyan-400" />
                  </span>
                  <span className="text-sm">{weather.humidity}% Humidity</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="p-2.5 rounded-lg bg-cyan-500/10">
                    <FiWind className="text-cyan-400" />
                  </span>
                  <span className="text-sm">{weather.windSpeed} km/h</span>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-16"
          >
            Why SkyCast
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                  {f.title}
                </h3>
                <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center relative">
          <div className="pointer-events-none absolute inset-0 flex justify-center items-center">
            <div className="w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px]" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
          >
            Ready to explore the skies?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative text-slate-400 mt-4 text-base md:text-lg max-w-xl mx-auto"
          >
            Sign up now and unlock the full SkyCast dashboard.
          </motion.p>

          <motion.a
            href="/signup"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative inline-block mt-10 px-9 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-semibold shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.7)] transition-shadow duration-300"
          >
            Get Started
          </motion.a>
        </section>

        <Footer />
      </div>
    </div>
  );
}
