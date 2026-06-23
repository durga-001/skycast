import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Globe", to: "/#globe" },
  { label: "Features", to: "/#features" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleNavClick = (to) => {
    setMenuOpen(false);
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-md group-hover:bg-orange-500/50 transition-all duration-300" />
              <WiDaySunny className="relative text-4xl text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Sky</span>
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                Cast
              </span>
            </span>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.to.startsWith("/#") ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.to)}
                  className="relative px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-orange-400 to-rose-500 group-hover:w-4/5 transition-all duration-300" />
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="relative px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-orange-400 to-rose-500 group-hover:w-4/5 transition-all duration-300" />
                </Link>
              ),
            )}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="relative px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                Dashboard
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-orange-400 to-rose-500 group-hover:w-4/5 transition-all duration-300" />
              </Link>
            )}
          </div>

          {/* Desktop Right Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-semibold text-white rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold text-slate-950 rounded-xl bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-300 hover:to-rose-400 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenuAlt3 className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) =>
                link.to.startsWith("/#") ? (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.to)}
                    className="text-left px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-200"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ),
              )}

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-200"
                >
                  Dashboard
                </Link>
              )}

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-sm font-semibold text-white rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-200"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full px-5 py-3 text-sm font-semibold text-center text-white rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-200"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="w-full px-10 py-5 text-sm font-semibold text-center text-slate-950 rounded-xl bg-gradient-to-r from-orange-400 to-rose-500 hover:from-orange-300 hover:to-rose-400 shadow-lg shadow-orange-500/20 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
