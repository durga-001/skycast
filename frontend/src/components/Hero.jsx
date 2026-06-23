import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiDayCloudy,
} from "react-icons/wi";
import { HiArrowRight } from "react-icons/hi";

function StatPill({ icon: Icon, label, value, delay, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`absolute flex items-center gap-2.5 px-4 py-3 rounded-2xl
        bg-white/8 backdrop-blur-md border border-white/12
        shadow-xl shadow-black/30 ${className}`}
    >
      <Icon className="text-2xl text-orange-400 shrink-0" />
      <div className="leading-tight">
        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
}

function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
    />
  );
}

function Particle({ style }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-orange-400/60"
      style={style}
      animate={{ y: [-10, 10, -10], opacity: [0.4, 1, 0.4] }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: style.delay,
      }}
    />
  );
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 95}%`,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
}));

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, -80]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  const titleWords = ["Weather,", "Reimagined", "for the", "Modern World."];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 pt-20"
    >
      {/* Background atmosphere */}
      <Orb className="w-[600px] h-[600px] bg-orange-500 -top-32 -left-48" />
      <Orb className="w-[500px] h-[500px] bg-rose-600 top-1/3 -right-40" />
      <Orb className="w-[400px] h-[400px] bg-amber-400 bottom-0 left-1/3" />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* Hero content */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full
            bg-white/8 border border-orange-400/30 backdrop-blur-sm
            text-xs font-semibold text-orange-300 uppercase tracking-widest"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-wide mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block mr-3 last:mr-0 ${
                i === 1
                  ? "bg-gradient-to-r from-orange-400 via-amber-300 to-rose-500 bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: "easeOut" }}
          className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed mt-10 mb-16"
        >
          Click anywhere on the globe to get real-time weather data —
          temperature, wind, humidity and more — delivered instantly for any
          location on Earth.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 px-12 py-4 rounded-2xl
              font-semibold text-slate-950 text-base
              bg-gradient-to-r from-orange-400 to-rose-500
              hover:from-orange-300 hover:to-rose-400
              shadow-xl shadow-orange-500/25 hover:shadow-orange-500/50
              transition-all duration-300"
          >
            Start Exploring
            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <button
            onClick={() =>
              document
                .getElementById("globe")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-12 py-4 rounded-2xl
              font-semibold text-white text-base
              bg-white/8 hover:bg-white/14 border border-white/12 hover:border-white/22
              backdrop-blur-sm transition-all duration-300"
          >
            Try the Globe
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
