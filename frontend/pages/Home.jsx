import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

/**
 * Globe placeholder.
 *
 * This is a styled stand-in for the real react-globe.gl instance.
 * To wire up the real globe later, replace the contents of
 * `.globeSphere` with a `<Globe />` from react-globe.gl, keep
 * `onLocationSelect` as the click handler (mapped from the globe's
 * `onGlobeClick={(coords) => ...}` callback), and reuse `selectedPoint`
 * to drive the readout panel below.
 */
function GlobePlaceholder() {
  const [selectedPoint, setSelectedPoint] = useState({ lat: 24.7, lng: 46.7 });

  const handleGlobeClick = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    // Placeholder coordinate mapping — purely illustrative until the
    // real globe instance supplies actual lat/lng from a raycast.
    const lat = (0.5 - y) * 180;
    const lng = (x - 0.5) * 360;

    setSelectedPoint({ lat, lng });
  };

  const formatCoord = (value, posLabel, negLabel) => {
    const direction = value >= 0 ? posLabel : negLabel;
    return `${Math.abs(value).toFixed(1)}°${direction}`;
  };

  return (
    <div className={styles.globeStage}>
      <div className={styles.globeWrap}>
        <div className={styles.globeOrbitRing} />

        <span className={styles.globeHint}>
          click anywhere on the globe to inspect conditions
        </span>

        <div
          className={styles.globeSphere}
          onClick={handleGlobeClick}
          role="button"
          tabIndex={0}
          aria-label="Interactive globe — select a location to view weather"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setSelectedPoint({
                lat: Math.random() * 140 - 70,
                lng: Math.random() * 360 - 180,
              });
            }
          }}
        />

        <div className={styles.globePin}>
          <span className={styles.globePinDot} />
        </div>

        <div className={styles.globeReadout}>
          <span>lat </span>
          {formatCoord(selectedPoint.lat, "N", "S")}
          {"  "}
          <span>lng </span>
          {formatCoord(selectedPoint.lng, "E", "W")}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Forecast map", href: "/map" },
    { label: "Features", href: "#features" },
    { label: "News", href: "#features" },
  ];

  const features = [
    {
      name: "Live global radar",
      desc: "Cloud cover, precipitation, and storm fronts updated continuously across every region.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3v18" />
        </svg>
      ),
    },
    {
      name: "Click-anywhere lookup",
      desc: "Spin the globe and select any coordinate on Earth to pull a full local forecast.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      ),
    },
    {
      name: "Hour-by-hour detail",
      desc: "Temperature, wind, humidity, and pressure trends broken down through the day.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      ),
    },
    {
      name: "Severe weather alerts",
      desc: "Get notified the moment conditions turn for any location you keep an eye on.",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10.3 3.9 2.6 17a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4L13.7 3.9a1.6 1.6 0 0 0-2.8 0Z" />
          <path d="M12 9.5v4M12 16.5h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.home}>
      {/* ---------------- Navbar ---------------- */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandMark} />
            Meridian
          </Link>

          <nav className={styles.navLinks}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.navActions}>
            <Link to="/login" className={styles.navGhostBtn}>
              Log in
            </Link>
            <Link to="/signup" className={styles.navPrimaryBtn}>
              Sign up free
            </Link>
          </div>

          <button
            type="button"
            className={styles.navMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
            <div className={styles.mobileMenuActions}>
              <Link to="/login" className={styles.navGhostBtn}>
                Log in
              </Link>
              <Link to="/signup" className={styles.navPrimaryBtn}>
                Sign up free
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
            live global coverage
          </span>

          <h1 className={styles.heroTitle}>
            Weather for <span className={styles.accentWord}>anywhere</span>,
            <br />
            down to the click.
          </h1>

          <p className={styles.heroSubtitle}>
            Spin the globe, drop a pin on any point on Earth, and get an
            accurate, hour-by-hour forecast in seconds. No searching for city
            names — just point.
          </p>

          <div className={styles.heroActions}>
            <Link to="/signup" className={styles.heroPrimaryBtn}>
              Get started free
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a href="#features" className={styles.heroSecondaryBtn}>
              See how it works
            </a>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>190+</span>
              <span className={styles.heroStatLabel}>countries covered</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>5 min</span>
              <span className={styles.heroStatLabel}>refresh interval</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>40M+</span>
              <span className={styles.heroStatLabel}>locations indexed</span>
            </div>
          </div>
        </div>

        <GlobePlaceholder />
      </section>

      {/* ---------------- Features ---------------- */}
      <section className={styles.features} id="features">
        <div className={styles.featuresHead}>
          <span className={styles.eyebrow}>what you get</span>
          <h2 className={styles.featuresTitle}>
            Everything you need to read the sky
          </h2>
          <p className={styles.featuresSubtitle}>
            Meridian pairs a real-time global data feed with an interface built
            around exploration — the globe is the search bar.
          </p>
        </div>

        <div className={styles.featureStrip}>
          {features.map((feature) => (
            <div key={feature.name} className={styles.featureItem}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureName}>{feature.name}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className={styles.cta}>
        <div className={styles.ctaPanel}>
          <div className={styles.ctaCopy}>
            <h2 className={styles.ctaTitle}>
              Create a free account and save your locations
            </h2>
            <p className={styles.ctaSubtitle}>
              Pin the places you care about and get back to their forecast in
              one click, every time you open Meridian.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <Link to="/signup" className={styles.heroPrimaryBtn}>
              Sign up free
            </Link>
            <Link to="/login" className={styles.heroSecondaryBtn}>
              Log in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
