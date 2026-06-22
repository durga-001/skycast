import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiRain,
  WiThermometer,
} from "react-icons/wi";
import {
  HiArrowRight,
  HiGlobeAlt,
  HiLightningBolt,
  HiShieldCheck,
  HiChartBar,
  HiDeviceMobile,
  HiBell,
} from "react-icons/hi";
import { MdAutoGraph } from "react-icons/md";
import Hero from "../components/Hero";
import Globe from "../components/Globe";
import Navbar from "../components/Navbar";

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ text }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full bg-white/6 border border-orange-400/25 text-xs font-semibold text-orange-300 uppercase tracking-widest">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
      {text}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURES SECTION
───────────────────────────────────────────── */
const features = [
  {
    icon: HiGlobeAlt,
    title: "Global Coverage",
    desc: "Access real-time weather data for every coordinate on Earth — from major cities to remote wilderness.",
    accent: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
    glow: "bg-orange-500/10",
  },
  {
    icon: HiLightningBolt,
    title: "Instant Results",
    desc: "Sub-100ms response times powered by distributed edge infrastructure. No waiting, no loading skeletons.",
    accent: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
    glow: "bg-amber-500/10",
  },
  {
    icon: HiShieldCheck,
    title: "Reliable Uptime",
    desc: "99.9% SLA backed by redundant data sources. Your app stays live even when the weather gets wild.",
    accent: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "bg-emerald-500/10",
  },
  {
    icon: HiChartBar,
    title: "Rich Data Points",
    desc: "Temperature, humidity, wind, UV index, visibility, pressure, dew point — every metric you need.",
    accent: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
    glow: "bg-rose-500/10",
  },
  {
    icon: HiDeviceMobile,
    title: "Mobile First",
    desc: "Fully responsive dashboard that works beautifully on every screen size, from watch to widescreen.",
    accent: "from-sky-500/20 to-sky-500/5",
    border: "border-sky-500/20",
    iconColor: "text-sky-400",
    glow: "bg-sky-500/10",
  },
  {
    icon: HiBell,
    title: "Smart Alerts",
    desc: "Get notified before severe weather hits your saved locations — storms, frost, heat waves and more.",
    accent: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
    glow: "bg-violet-500/10",
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative flex flex-col gap-4 p-7 rounded-3xl
        bg-gradient-to-br ${feature.accent}
        border ${feature.border}
        backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
    >
      {/* icon */}
      <div
        className={`w-12 h-12 rounded-2xl ${feature.glow} flex items-center justify-center`}
      >
        <Icon className={`text-2xl ${feature.iconColor}`} />
      </div>
      <div>
        <h3 className="text-base font-bold text-white mb-1.5">
          {feature.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
    >
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <FadeUp>
            <SectionEyebrow text="Features" />
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Everything weather.{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                Nothing extra.
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-4 text-base md:text-lg text-slate-400 max-w-xl mx-auto">
              SkyCast is built for developers and enthusiasts who want precise,
              beautiful weather data without the bloat.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <FadeUp delay={0.2} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-3xl overflow-hidden border border-white/8">
            {[
              { icon: WiDaySunny, value: "190+", label: "Countries" },
              { icon: WiThermometer, value: "50+", label: "Data points" },
              { icon: MdAutoGraph, value: "99.9%", label: "Uptime" },
              { icon: WiBarometer, value: "<100ms", label: "Response" },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 py-8 px-4 bg-slate-950"
              >
                <Icon className="text-3xl text-orange-400" />
                <span className="text-2xl md:text-3xl font-extrabold text-white">
                  {value}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
const steps = [
  {
    step: "01",
    title: "Spin the Globe",
    desc: "Drag to rotate the interactive 3D globe and explore any region of the world.",
  },
  {
    step: "02",
    title: "Click a Location",
    desc: "Tap any point on the globe. Coordinates are instantly captured and sent to our weather engine.",
  },
  {
    step: "03",
    title: "Get Instant Weather",
    desc: "Real-time temperature, humidity, wind speed, and conditions appear in under a second.",
  },
];

function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <FadeUp>
            <SectionEyebrow text="How it works" />
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Three steps to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                any forecast.
              </span>
            </h2>
          </FadeUp>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* connecting line desktop */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0 pointer-events-none" />

          {steps.map((s, i) => (
            <FadeUp key={s.step} delay={i * 0.15}>
              <div className="relative flex flex-col items-center text-center gap-4">
                {/* step number bubble */}
                <div
                  className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center
                  bg-gradient-to-br from-orange-500/30 to-rose-500/20
                  border border-orange-500/30 shadow-lg shadow-orange-500/10"
                >
                  <span className="text-xl font-black text-orange-400">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
        <FadeUp>
          <div
            className="relative flex flex-col items-center text-center gap-8
            bg-gradient-to-br from-orange-500/12 via-white/4 to-rose-500/12
            border border-white/10 rounded-[2.5rem]
            px-8 py-16 md:px-16 md:py-20
            shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* corner glows */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* dot grid */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <SectionEyebrow text="Get started free" />

              {/* mini trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs text-slate-500 font-medium">
                {[
                  "No credit card required",
                  "Free forever plan",
                  "190+ countries",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-orange-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const links = {
    Product: ["Features", "Globe", "Dashboard", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Cookies"],
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/8 mt-24 py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-md" />
                <WiDaySunny className="relative text-3xl text-orange-400" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Sky</span>
                <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                  Cast
                </span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Premium weather intelligence for every corner of the globe.
            </p>
            {/* mini weather strip */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: WiDaySunny, v: "24°" },
                { icon: WiHumidity, v: "61%" },
                { icon: WiStrongWind, v: "12 km/h" },
                { icon: WiRain, v: "10%" },
              ].map(({ icon: Icon, v }) => (
                <div key={v} className="flex flex-col items-center gap-0.5">
                  <Icon className="text-lg text-orange-400/70" />
                  <span className="text-[10px] text-slate-600 font-medium">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1">
                {group}
              </p>
              {items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} SkyCast. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with <span className="text-orange-400">♥</span> using React +
            Open-Meteo
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE (assembles all sections)
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center text-center space-y-24">
      <Navbar />
      <Hero />
      <Globe />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
