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

    // Replace with backend API later
    if (email === "demo@skycast.com" && password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <WiDaySunny className="mx-auto text-6xl text-blue-600" />

          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Sky<span className="text-blue-600">Cast</span>
          </h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>

            <div className="relative">
              <HiMail className="absolute left-3 top-3.5 text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <HiLockClosed className="absolute left-3 top-3.5 text-gray-400 text-xl" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
