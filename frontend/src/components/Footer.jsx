// components/Footer.jsx
import { Link } from "react-router-dom";
import { FiCloud } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <FiCloud className="text-white text-xs" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Sky
              <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                Cast
              </span>
            </span>
          </Link>

          {/* Attribution */}
          <p className="text-xs text-slate-600 text-center md:text-right">
            © 2026 SkyCast · Powered by{" "}
            <span className="text-slate-500">OpenWeather & NewsAPI</span>
          </p>
        </div>
      </div>
      
    </footer>
  );
}
