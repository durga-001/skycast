import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import { FiCloud } from "react-icons/fi";

const navLinks = [
  { label: "Home", id: null },
  { label: "Map", id: "map" },
  { label: "Features", id: "features" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
        toast.error("Unable to fetch user");
      }
    };

    fetchUser();
  }, [location]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      toast.error("Server error");
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
          <FiCloud  className="logo-icon" />
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

          {user && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="navbar-auth">
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

        {/* Mobile Toggle */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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

          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mobile-link"
            >
              Dashboard
            </Link>
          )}

          <div className="mobile-auth">
            {user ? (
              <button onClick={handleLogout} className="btn btn-danger full">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline full">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary full">
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
