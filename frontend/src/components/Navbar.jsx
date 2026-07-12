import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiCloud } from "react-icons/fi";
import { toast } from "react-toastify";

import { getCurrentUser, logoutUser } from "../services/authService";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", id: null },
  { label: "Map", id: "map" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch {
      toast.error("Logout failed");
    }
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);

    if (!id) {
      navigate("/");
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FiCloud className="logo-icon" />

          <h1 className="logo-text">
            <span>Sky</span>
            <span className="logo-accent">Cast</span>
          </h1>
        </Link>

        <nav className="navbar-links">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="nav-link"
            >
              {item.label}
            </button>
          ))}

          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </nav>

        <div className="navbar-auth">
          <ThemeToggle />

          {user ? (
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>

              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="mobile-link"
            >
              {item.label}
            </button>
          ))}

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            Dashboard
          </Link>

          <div className="mobile-auth">
            <ThemeToggle />

            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="btn btn-danger full"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-outline full"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
