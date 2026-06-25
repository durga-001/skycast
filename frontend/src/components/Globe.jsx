import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLocationMarker, HiGlobeAlt } from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";

/* ─────────────────────────────────────────────
   DYNAMIC IMPORT WRAPPER
   react-globe.gl uses Three.js internally and
   must be loaded client-side only.
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function formatCoord(val, posLabel, negLabel) {
  if (val == null) return "—";
  return `${Math.abs(val).toFixed(4)}° ${val >= 0 ? posLabel : negLabel}`;
}

/* ─────────────────────────────────────────────
   LOADING SKELETON
───────────────────────────────────────────── */
function GlobeLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* Pulsing circle */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-rose-500/10 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-500/15 to-rose-500/8 animate-pulse delay-75" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-500/10 to-rose-500/5 animate-pulse delay-150" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-orange-400/30 border-t-orange-400 animate-spin" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-slate-400">
          Loading Earth textures…
        </p>
        <p className="text-xs text-slate-600"></p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COORDINATE DISPLAY CARD
───────────────────────────────────────────── */
function CoordCard({ lat, lng }) {
  return (
    <AnimatePresence>
      {lat != null && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 px-5 py-3 rounded-2xl
            bg-white/6 backdrop-blur-md border border-white/12
            shadow-lg shadow-black/20"
        >
          <HiLocationMarker className="text-orange-400 text-lg shrink-0" />
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-slate-300">
              <span className="text-xs text-slate-500 mr-1.5 uppercase tracking-widest">
                Lat
              </span>
              {formatCoord(lat, "N", "S")}
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-slate-300">
              <span className="text-xs text-slate-500 mr-1.5 uppercase tracking-widest">
                Lng
              </span>
              {formatCoord(lng, "E", "W")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   HINT PILL
───────────────────────────────────────────── */
function HintPill({ hasSelection }) {
  return (
    <AnimatePresence mode="wait">
      {!hasSelection ? (
        <motion.div
          key="hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/5 border border-white/8
            text-xs text-slate-500 font-medium"
        >
          <HiGlobeAlt className="text-orange-400/70 text-sm" />
        </motion.div>
      ) : (
        <motion.div
          key="selected"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-orange-500/10 border border-orange-500/20
            text-xs text-orange-300 font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          Location selected — fetching weather…
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN GLOBE COMPONENT
───────────────────────────────────────────── */
export default function Globe({ onLocationSelect }) {
  const globeRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLibReady, setIsLibReady] = useState(false);
  const [GlobeComponent, setGlobeComponent] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [globeSize, setGlobeSize] = useState(600);
  const [hovered, setHovered] = useState(false);

  /* ── Responsive size ── */
  useEffect(() => {
    function updateSize() {
      const w = window.innerWidth;
      if (w < 480) setGlobeSize(320);
      else if (w < 768) setGlobeSize(420);
      else if (w < 1024) setGlobeSize(520);
      else setGlobeSize(600);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ── Dynamic import of react-globe.gl ── */
  useEffect(() => {
    import("react-globe.gl")
      .then((mod) => {
        setGlobeComponent(() => mod.default);
        setIsLibReady(true);
      })
      .catch((err) => {
        console.error("Failed to load globe:", err);
      });
  }, []);

  /* ── Auto-rotate setup ── */
  useEffect(() => {
    if (!globeRef.current || !isLoaded) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
      controls.enableZoom = true;
      controls.minDistance = 200;
      controls.maxDistance = 600;
    }
    /* Initial camera position */
    globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 1000);
  }, [isLoaded]);

  /* ── Pause autorotate on hover ── */
  useEffect(() => {
    if (!globeRef.current || !isLoaded) return;
    const controls = globeRef.current.controls();
    if (controls) controls.autoRotate = !hovered;
  }, [hovered, isLoaded]);

  /* ── Click handler ── */
  const handleGlobeClick = useCallback(
    ({ lat, lng }) => {
      const point = {
        lat: +lat.toFixed(4), lng: +lng.toFixed(4)
      };
      setSelectedPoint(point);
      if (onLocationSelect) onLocationSelect(point);

      /* Fly camera to clicked point */
      if (globeRef.current) {
        globeRef.current.pointOfView(
          { lat: point.lat, lng: point.lng, altitude: 1.8 },
          800,
        );
      }
    },
    [onLocationSelect],
  );

  /* ── Marker data ── */
  const markerData = selectedPoint ? [selectedPoint] : [];

  /* ── Globe config ── */
  const globeConfig = {
    /* Earth textures — high quality NASA Blue Marble */
    globeImageUrl: "/earth-blue-marble.jpg",
    bumpImageUrl: "/earth-topology.png",

    /* Atmosphere */
    showAtmosphere: true,
    atmosphereColor: "#f97316" /* orange-500 */,
    atmosphereAltitude: 0.18,

    /* Background */
    backgroundColor: "rgba(0,0,0,0)",

    /* Points (marker) */
    pointsData: markerData,
    pointLat: (d) => d.lat,
    pointLng: (d) => d.lng,
    pointColor: () => "#f97316",
    pointAltitude: 0.015,
    pointRadius: 0.6,
    pointResolution: 12,

    /* Rings (animated glow around marker) */
    ringsData: markerData,
    ringLat: (d) => d.lat,
    ringLng: (d) => d.lng,
    ringColor: () => (t) => `rgba(249,115,22,${1 - t})`,
    ringMaxRadius: 4,
    ringPropagationSpeed: 2,
    ringRepeatPeriod: 800,

    /* Events */
    onGlobeClick: handleGlobeClick,
    onGlobeReady: () => setIsLoaded(true),

    width: globeSize,
    height: globeSize,
  };

  return (
    <section className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[700px] h-[700px] rounded-full
          bg-gradient-to-br from-orange-500/8 via-amber-400/4 to-rose-500/6
          blur-3xl"
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full
              bg-white/6 border border-orange-400/25
              text-xs font-semibold text-orange-300 uppercase tracking-widest"
          ></motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            Explore Weather{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-500 bg-clip-text text-transparent">
              Anywhere on Earth
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="mt-4 text-base md:text-lg text-slate-400 max-w-xl mx-auto"
          >
            Click any location on the globe to view live weather data.
          </motion.p>
        </div>

        {/* ── Globe card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center gap-8
            bg-white/4 backdrop-blur-xl border border-white/10
            rounded-[2.5rem] px-6 py-12 md:px-12 md:py-16
            shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Card corner glows */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-rose-500/8 rounded-full blur-3xl pointer-events-none" />

          {/* ── Globe wrapper ── */}
          <div
            ref={containerRef}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ width: globeSize, height: globeSize, maxWidth: "100%" }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute rounded-full pointer-events-none transition-all duration-500"
              style={{
                inset: -16,
                background:
                  "radial-gradient(ellipse at center, rgba(249,115,22,0.12) 0%, transparent 70%)",
                filter: "blur(8px)",
                opacity: hovered ? 1 : 0.6,
              }}
            />

            {/* Loading state */}
            <AnimatePresence>
              {(!isLibReady || !isLoaded) && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950"
                  style={{ borderRadius: "50%" }}
                >
                  <GlobeLoader />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Globe */}
            {isLibReady && GlobeComponent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-full overflow-hidden"
                style={{
                  filter: `drop-shadow(0 0 ${hovered ? 40 : 24}px rgba(249,115,22,${hovered ? 0.3 : 0.15}))`,
                  transition: "filter 0.4s ease",
                }}
              >
                <GlobeComponent ref={globeRef} {...globeConfig} />
              </motion.div>
            )}
          </div>

          {/* ── Bottom controls ── */}
          <div className="flex flex-col items-center gap-4 w-full">
            <HintPill hasSelection={!!selectedPoint} />
            <CoordCard lat={selectedPoint?.lat} lng={selectedPoint?.lng} />

            {/* Reset button */}
            <AnimatePresence>
              {selectedPoint && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  onClick={() => {
                    setSelectedPoint(null);
                    if (globeRef.current) {
                      const controls = globeRef.current.controls();
                      if (controls) controls.autoRotate = true;
                      globeRef.current.pointOfView(
                        { lat: 20, lng: 0, altitude: 2.2 },
                        800,
                      );
                    }
                  }}
                  className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200 underline underline-offset-2"
                >
                  Clear selection
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* ── Feature pills row ── */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {[
              { icon: WiDaySunny, label: "Real-time data" },
              { icon: HiGlobeAlt, label: "190+ countries" },
              { icon: HiLocationMarker, label: "Exact coordinates" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                  bg-white/4 border border-white/8
                  text-xs text-slate-500 font-medium"
              >
                <Icon className="text-orange-400/70 text-sm" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
