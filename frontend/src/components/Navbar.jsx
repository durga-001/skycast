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
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <WiDaySunny className="text-5xl text-blue-600" />

            <h1 className="text-3xl font-bold">
              <span className="text-gray-900">Sky</span>
              <span className="text-blue-600">Cast</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center h-12 min-w-[120px] rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center h-12 min-w-[130px] rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 hover:text-blue-600"
                >
                  {item.label}
                </button>
              ))}

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
              )}

              <hr />

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full h-12 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center h-12 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center h-12 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
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
