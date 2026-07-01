// components/Footer.jsx

import { Link } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-30 py-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <WiDaySunny className="text-5xl text-blue-600" />

            <h2 className="text-3xl font-bold">
              <span className="text-gray-900">Sky</span>
              <span className="text-blue-600">Cast</span>
            </h2>
          </Link>

          <p className="text-gray-600 text-sm">
            © 2026 SkyCast. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
