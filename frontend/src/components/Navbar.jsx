// components/Navbar.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", id: null },
  { label: "Globe", id: "globe" },
  { label: "Features", id: "features" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
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
      }, 200);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <WiDaySunny className="text-4xl text-orange-500" />

            <span className="text-2xl font-bold">
              <span className="text-slate-800">Sky</span>
              <span className="text-orange-500">Cast</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                {item.label}
              </button>
            ))}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 hover:text-orange-500"
                >
                  {item.label}
                </button>
              ))}

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-orange-500"
                >
                  Dashboard
                </Link>
              )}

              <hr />

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 py-2 text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-orange-500 py-2 text-center text-orange-500"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-orange-500 py-2 text-center text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
