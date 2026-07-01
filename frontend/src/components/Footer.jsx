// components/Footer.jsx

import { Link } from "react-router-dom";
import { FiCloud } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FiCloud className="text-3xl text-orange-400" />

            <h2 className="text-2xl font-bold text-white">
              Sky<span className="text-orange-400">Cast</span>
            </h2>
          </Link>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2026 SkyCast. All Rights Reserved.
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Powered by OpenWeather API & NewsAPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
