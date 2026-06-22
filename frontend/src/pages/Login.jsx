import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiArrowRight,
} from "react-icons/hi";

/* ── Background orb ───────────────────────────────────────── */
function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-25 pointer-events-none ${className}`}
    />
  );
}

/* ── Input field ──────────────────────────────────────────── */
function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightElement,
  error,
  autoComplete,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-slate-400 uppercase tracking-widest"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 pointer-events-none" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full bg-white/6 border ${
            error ? "border-rose-500/60" : "border-white/10"
          } rounded-2xl pl-11 pr-${rightElement ? "12" : "4"} py-3.5
            text-sm text-white placeholder-slate-600
            focus:outline-none focus:border-orange-400/60 focus:bg-white/8
            transition-all duration-200`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
}

/* ── Divider ──────────────────────────────────────────────── */
function Divider({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-white/8" />
      <span className="text-xs text-slate-600 font-medium">{text}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

/* ── Main Login page ──────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setAuthError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setAuthError("");

    /* ── Simulated auth — replace with your real API call ── */
    await new Promise((r) => setTimeout(r, 1200));

    if (form.email === "demo@skycast.app" && form.password === "password123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else {
      setAuthError(
        "Invalid email or password. Try demo@skycast.app / password123",
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background atmosphere */}
      <Orb className="w-[500px] h-[500px] bg-orange-500 -top-40 -left-32" />
      <Orb className="w-[400px] h-[400px] bg-rose-600 bottom-0 -right-28" />
      <Orb className="w-[300px] h-[300px] bg-amber-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glow behind card */}
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-orange-500/20 to-rose-500/15 blur-2xl" />

        <div className="relative bg-white/6 backdrop-blur-2xl border border-white/12 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/50">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-500/40 blur-lg" />
              <WiDaySunny className="relative text-5xl text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Sky</span>
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                Cast
              </span>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Log in to access your weather dashboard.
            </p>
          </div>

          {/* Auth error banner */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-2xl bg-rose-500/12 border border-rose-500/25 text-sm text-rose-400 text-center font-medium"
            >
              {authError}
            </motion.div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
          >
            <InputField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              icon={HiMail}
              error={errors.email}
              autoComplete="email"
            />

            <InputField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              icon={HiLockClosed}
              error={errors.password}
              autoComplete="current-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <HiEyeOff className="text-lg" />
                  ) : (
                    <HiEye className="text-lg" />
                  )}
                </button>
              }
            />

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <a
                href="#"
                className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-2
                px-6 py-4 rounded-2xl mt-1
                font-semibold text-sm text-slate-950
                bg-gradient-to-r from-orange-400 to-rose-500
                hover:from-orange-300 hover:to-rose-400
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
                transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Log in
                  <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </button>
          </form>

          <Divider text="or continue with" />

          {/* OAuth placeholders */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            {[
              {
                label: "Google",
                logo: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26 9.77A7.2 7.2 0 0 1 12 4.8c1.73 0 3.29.62 4.51 1.63l3.37-3.37A12 12 0 0 0 0 12c0 1.99.49 3.86 1.35 5.52l3.91-3.04A7.18 7.18 0 0 1 5.26 9.77z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M12 19.2c-2.37 0-4.47-.93-6.06-2.44l-3.91 3.04A12 12 0 0 0 12 24c3.23 0 6.16-1.2 8.39-3.17l-3.7-2.86A7.2 7.2 0 0 1 12 19.2z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.76 12.27c0-.84-.07-1.47-.22-2.11H12v3.84h6.68a5.9 5.9 0 0 1-2.5 3.82l3.7 2.86C21.98 18.6 23.76 15.7 23.76 12.27z"
                    />
                    <path
                      fill="#34A853"
                      d="M5.94 14.48l-3.91 3.04A12 12 0 0 0 12 24c3.23 0 6.16-1.2 8.39-3.17l-3.7-2.86A7.2 7.2 0 0 1 5.94 14.48z"
                    />
                  </svg>
                ),
              },
              {
                label: "GitHub",
                logo: (
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                ),
              },
            ].map(({ label, logo }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl
                  bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/18
                  text-sm font-medium text-slate-300 hover:text-white
                  transition-all duration-200"
              >
                {logo}
                {label}
              </button>
            ))}
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
            >
              Sign up free
            </Link>
          </p>

          {/* Demo hint */}
          <p className="text-center text-xs text-slate-600 mt-3">
            Demo: <span className="text-slate-400">demo@skycast.app</span> /{" "}
            <span className="text-slate-400">password123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
