// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FiCloud } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true",
  );

  useEffect(() => {
    const sync = () =>
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-950/60 border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-bold text-xl"
        >
          <FiCloud className="text-cyan-400" />
          <span>
            Sky<span className="text-cyan-400">Cast</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-cyan-400 transition">
            Dashboard
          </Link>
          <Link to="/weather-map" className="hover:text-cyan-400 transition">
            Weather Map
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
