import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
  WiDayCloudy,
} from "react-icons/wi";
import { HiLocationMarker, HiRefresh, HiX } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";

/* ── Weather icon picker ──────────────────────────────────── */
function WeatherIcon({ condition, className }) {
  const c = condition?.toLowerCase() ?? "";
  if (c.includes("thunder")) return <WiThunderstorm className={className} />;
  if (c.includes("snow") || c.includes("sleet"))
    return <WiSnow className={className} />;
  if (c.includes("rain") || c.includes("drizzle"))
    return <WiRain className={className} />;
  if (c.includes("fog") || c.includes("mist") || c.includes("haze"))
    return <WiFog className={className} />;
  if (c.includes("cloud") || c.includes("overcast"))
    return <WiDayCloudy className={className} />;
  if (c.includes("clear") || c.includes("sunny"))
    return <WiDaySunny className={className} />;
  return <WiCloudy className={className} />;
}

/* ── Stat card inside weather result ──────────────────────── */
function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/6 border border-white/10">
      <Icon className="text-2xl text-orange-400" />
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-[11px] text-slate-400 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

/* ── Spinning globe built with pure CSS + SVG ─────────────── */
function SpinningGlobe({ onClick, isLoading, clickedPoint }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const rotationRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const dragDelta = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.42;

    /* simplified continent outlines as arc groups [lon, lat, radius] */
    const landMasses = [
      // North America
      {
        points: [
          [-100, 45],
          [-80, 60],
          [-60, 50],
          [-70, 35],
          [-90, 25],
          [-110, 30],
          [-120, 40],
          [-100, 45],
        ],
      },
      // South America
      {
        points: [
          [-70, 10],
          [-55, -5],
          [-45, -20],
          [-50, -35],
          [-65, -50],
          [-75, -40],
          [-80, -20],
          [-75, 0],
          [-70, 10],
        ],
      },
      // Europe
      {
        points: [
          [0, 55],
          [20, 60],
          [30, 50],
          [20, 40],
          [5, 38],
          [-5, 43],
          [0, 55],
        ],
      },
      // Africa
      {
        points: [
          [-15, 15],
          [35, 15],
          [42, 5],
          [40, -10],
          [30, -35],
          [15, -35],
          [10, -5],
          [-15, 15],
        ],
      },
      // Asia
      {
        points: [
          [60, 55],
          [100, 65],
          [140, 55],
          [145, 40],
          [130, 30],
          [100, 15],
          [70, 20],
          [50, 30],
          [40, 50],
          [60, 55],
        ],
      },
      // Australia
      {
        points: [
          [115, -25],
          [130, -15],
          [150, -25],
          [150, -38],
          [130, -40],
          [115, -35],
          [115, -25],
        ],
      },
    ];

    function project(lon, lat, rotation) {
      const lonRad = ((lon + rotation) * Math.PI) / 180;
      const latRad = (lat * Math.PI) / 180;
      const x = cx + r * Math.cos(latRad) * Math.sin(lonRad);
      const y = cy - r * Math.sin(latRad);
      const z = Math.cos(latRad) * Math.cos(lonRad);
      return { x, y, z };
    }

    function drawGlobe(rotation) {
      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const glowGrad = ctx.createRadialGradient(
        cx,
        cy,
        r * 0.8,
        cx,
        cy,
        r * 1.3,
      );
      glowGrad.addColorStop(0, "rgba(251,146,60,0.08)");
      glowGrad.addColorStop(1, "rgba(251,146,60,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Ocean
      const oceanGrad = ctx.createRadialGradient(
        cx - r * 0.3,
        cy - r * 0.3,
        0,
        cx,
        cy,
        r,
      );
      oceanGrad.addColorStop(0, "#1e3a5f");
      oceanGrad.addColorStop(0.6, "#0f2340");
      oceanGrad.addColorStop(1, "#081525");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = oceanGrad;
      ctx.fill();

      // Latitude grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 5) {
          const p = project(lon, lat, rotation);
          if (p.z > 0) {
            first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            first = false;
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Longitude grid lines
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 5) {
          const p = project(lon, lat, rotation);
          if (p.z > 0) {
            first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            first = false;
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Land masses
      landMasses.forEach(({ points }) => {
        ctx.beginPath();
        let started = false;
        points.forEach(([lon, lat]) => {
          const p = project(lon, lat, rotation);
          if (p.z > -0.1) {
            started ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
            started = true;
          }
        });
        ctx.closePath();
        const landGrad = ctx.createLinearGradient(
          cx - r,
          cy - r,
          cx + r,
          cy + r,
        );
        landGrad.addColorStop(0, "rgba(251,146,60,0.55)");
        landGrad.addColorStop(1, "rgba(244,63,94,0.35)");
        ctx.fillStyle = landGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(251,146,60,0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Specular highlight
      const specGrad = ctx.createRadialGradient(
        cx - r * 0.35,
        cy - r * 0.35,
        0,
        cx,
        cy,
        r,
      );
      specGrad.addColorStop(0, "rgba(255,255,255,0.12)");
      specGrad.addColorStop(0.4, "rgba(255,255,255,0.03)");
      specGrad.addColorStop(1, "rgba(0,0,0,0.3)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Rim light
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251,146,60,0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Clicked point marker
      if (clickedPoint) {
        const p = project(clickedPoint.lon, clickedPoint.lat, rotation);
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(251,146,60,0.9)";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(251,146,60,0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    function animate() {
      if (!isDragging.current) {
        rotationRef.current -= 0.12;
      }
      drawGlobe(rotationRef.current);
      animRef.current = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [clickedPoint]);

  const handleCanvasClick = useCallback(
    (e) => {
      if (Math.abs(dragDelta.current) > 5) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = canvas.width * 0.42;
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy > r * r) return;

      const latRad = Math.asin(-dy / r);
      const lonRad = Math.asin(
        Math.min(1, Math.max(-1, dx / (r * Math.cos(latRad)))),
      );
      const lat = (latRad * 180) / Math.PI;
      const lon = (lonRad * 180) / Math.PI - rotationRef.current;
      const normLon = (((lon % 360) + 540) % 360) - 180;
      onClick({
        lat: Math.round(lat * 10) / 10,
        lon: Math.round(normLon * 10) / 10,
      });
    },
    [onClick],
  );

  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    dragDelta.current = 0;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    dragDelta.current += delta;
    rotationRef.current += delta * 0.3;
    lastX.current = e.clientX;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    lastX.current = e.touches[0].clientX;
    dragDelta.current = 0;
  };
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientX - lastX.current;
    dragDelta.current += delta;
    rotationRef.current += delta * 0.3;
    lastX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-rose-500/10 blur-2xl scale-110 pointer-events-none" />
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative rounded-full cursor-crosshair select-none
          w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]
          transition-all duration-300 ${isLoading ? "opacity-70" : "opacity-100"}`}
        style={{ touchAction: "none" }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-orange-400/30 border-t-orange-400 animate-spin" />
        </div>
      )}
    </div>
  );
}

/* ── Weather result card ──────────────────────────────────── */
function WeatherCard({ data, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-lg mx-auto mt-10
        bg-white/6 backdrop-blur-xl border border-white/12
        rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/40"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
      >
        <HiX className="text-lg" />
      </button>

      {/* Location header */}
      <div className="flex items-start gap-3 mb-6">
        <HiLocationMarker className="text-orange-400 text-xl shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">
            {data.city || "Unknown Location"}
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            {data.lat}°{data.lat >= 0 ? "N" : "S"} · {data.lon}°
            {data.lon >= 0 ? "E" : "W"}
          </p>
        </div>
      </div>

      {/* Main temp + condition */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-6xl font-extrabold text-white leading-none">
            {Math.round(data.temperature)}
            <span className="text-3xl font-light text-slate-300">°C</span>
          </div>
          <p className="text-slate-400 text-sm mt-2 capitalize">
            {data.condition}
          </p>
        </div>
        <WeatherIcon
          condition={data.condition}
          className="text-[80px] text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.5)]"
        />
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={WiHumidity}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <StatCard
          icon={WiStrongWind}
          label="Wind"
          value={`${data.windSpeed} km/h`}
        />
        <StatCard
          icon={WiThermometer}
          label="Feels like"
          value={`${Math.round(data.feelsLike ?? data.temperature)}°`}
        />
      </div>
    </motion.div>
  );
}

/* ── Error state ──────────────────────────────────────────── */
function ErrorCard({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-lg mx-auto mt-10 px-6 py-5 rounded-2xl
        bg-rose-500/10 border border-rose-500/20 text-center"
    >
      <p className="text-rose-400 text-sm font-medium mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
          text-xs font-semibold text-white bg-rose-500/20 hover:bg-rose-500/30
          border border-rose-500/30 transition-all"
      >
        <HiRefresh /> Try again
      </button>
    </motion.div>
  );
}

/* ── Idle hint ─────────────────────────────────────────────── */
function IdleHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-10 flex flex-col items-center gap-3 text-center"
    >
      <div
        className="flex items-center gap-2 px-5 py-2.5 rounded-full
        bg-white/6 border border-white/10 text-sm text-slate-400"
      >
        <MdMyLocation className="text-orange-400 text-base" />
        Click anywhere on the globe to fetch live weather
      </div>
      <p className="text-xs text-slate-600">
        Drag to rotate · Click a location · Get instant weather
      </p>
    </motion.div>
  );
}

/* ── Main GlobeSection ─────────────────────────────────────── */
export default function Globe() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clickedPoint, setClickedPoint] = useState(null);
  const lastCoords = useRef(null);

  const fetchWeather = useCallback(async ({ lat, lon }) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);
    lastCoords.current = { lat, lon };

    try {
      /* ── Replace this URL with your actual backend endpoint ── */
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`,
      );
      if (!res.ok) throw new Error("Failed to fetch weather data.");
      const raw = await res.json();

      /* Reverse geocode city name */
      let city = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
      try {
        const geo = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        );
        const geoData = await geo.json();
        city =
          geoData.address?.city ||
          geoData.address?.town ||
          geoData.address?.village ||
          geoData.address?.county ||
          geoData.address?.state ||
          geoData.address?.country ||
          city;
      } catch (_) {
        /* silently fall back to coords */
      }

      const cw = raw.current_weather;
      const humidity = raw.hourly?.relativehumidity_2m?.[0] ?? "--";
      const feelsLike = raw.hourly?.apparent_temperature?.[0] ?? cw.temperature;

      /* WMO code → condition string */
      const wmoMap = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Icy fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        61: "Slight rain",
        63: "Rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Rain showers",
        81: "Rain showers",
        82: "Violent showers",
        85: "Snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm w/ hail",
        99: "Thunderstorm w/ hail",
      };

      setWeather({
        city,
        lat,
        lon,
        temperature: cw.temperature,
        feelsLike,
        windSpeed: cw.windspeed,
        humidity,
        condition: wmoMap[cw.weathercode] ?? "Unknown",
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGlobeClick = useCallback(
    (coords) => {
      setClickedPoint(coords);
      fetchWeather(coords);
    },
    [fetchWeather],
  );

  return (
    <section
      id="globe"
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[700px] h-[700px] rounded-full
        bg-gradient-to-br from-orange-500/8 to-rose-500/5
        blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full
              bg-white/6 border border-orange-400/25
              text-xs font-semibold text-orange-300 uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Interactive Globe
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            Any place.{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
              Instant weather.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-base md:text-lg text-slate-400 max-w-xl mx-auto"
          >
            Spin the globe, click any region, and watch live weather data appear
            in seconds — powered by Open-Meteo.
          </motion.p>
        </div>

        {/* Globe card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="relative flex flex-col items-center
            bg-white/4 backdrop-blur-xl border border-white/10
            rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-black/40"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-[2rem] blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-500/10 rounded-[2rem] blur-2xl pointer-events-none" />

          <SpinningGlobe
            onClick={handleGlobeClick}
            isLoading={isLoading}
            clickedPoint={clickedPoint}
          />

          <AnimatePresence mode="wait">
            {!weather && !error && !isLoading && <IdleHint key="hint" />}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 flex items-center gap-3 text-slate-400 text-sm"
              >
                <div className="w-4 h-4 rounded-full border-2 border-orange-400/30 border-t-orange-400 animate-spin" />
                Fetching weather data…
              </motion.div>
            )}
            {error && !isLoading && (
              <ErrorCard
                key="error"
                message={error}
                onRetry={() =>
                  lastCoords.current && fetchWeather(lastCoords.current)
                }
              />
            )}
            {weather && !isLoading && (
              <WeatherCard
                key="weather"
                data={weather}
                onClose={() => {
                  setWeather(null);
                  setClickedPoint(null);
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
