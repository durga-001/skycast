import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your backend API
    if (email === "demo@skycast.com" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <WiDaySunny className="text-5xl text-orange-400 mx-auto" />

          <h1 className="text-3xl font-bold text-white mt-2">
            Sky<span className="text-orange-400">Cast</span>
          </h1>

          <p className="text-gray-400 mt-2">Login to your account</p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}

          <div>
            <label className="block text-gray-300 mb-2">Email</label>

            <div className="relative">
              <HiMail className="absolute left-3 top-3 text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-600 bg-slate-700 text-white focus:outline-none focus:border-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <div className="relative">
              <HiLockClosed className="absolute left-3 top-3 text-gray-400 text-xl" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-11 pr-12 py-3 rounded-lg border border-gray-600 bg-slate-700 text-white focus:outline-none focus:border-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          {/* Button */}

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>

        {/* Signup */}

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
