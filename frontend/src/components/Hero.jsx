// components/Hero.jsx

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
      >
        Real-Time Weather,
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Anywhere on Earth
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-6 max-w-xl mx-auto text-slate-400 text-lg"
      >
        Spin the globe, pick a spot, and get instant live weather insights with
        a premium, data-rich dashboard.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 flex justify-center gap-4"
      >
        <a
          href="#globe"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
        >
          Explore Globe
          <FiArrowRight />
        </a>
      </motion.div>
    </section>
  );
}
