import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import {
  HiMail,
  HiLockClosed,
  HiUser,
  HiEye,
  HiEyeOff,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi";

/* ── Background orb ───────────────────────────────────────── */
function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-25 pointer-events-none ${className}`}
    />
  );
}

/* ── Password strength meter ──────────────────────────────── */
function StrengthMeter({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
  const strengthColor = [
    "",
    "bg-rose-500",
    "bg-amber-400",
    "bg-orange-400",
    "bg-emerald-400",
  ][score];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-2 mt-1"
    >
      {/* Bar */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? strengthColor : "bg-white/10"
            }`}
          />
        ))}
      </div>
      {/* Label + checks */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold ${
            [
              "",
              "text-rose-400",
              "text-amber-400",
              "text-orange-400",
              "text-emerald-400",
            ][score]
          }`}
        >
          {strengthLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map(({ label, pass }) => (
          <span
            key={label}
            className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-200 ${
              pass ? "text-emerald-400" : "text-slate-600"
            }`}
          >
            <HiCheckCircle
              className={`text-sm shrink-0 ${pass ? "opacity-100" : "opacity-30"}`}
            />
            {label}
          </span>
        ))}
      </div>
    </motion.div>
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
  hint,
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
          } rounded-2xl pl-11 py-3.5 ${rightElement ? "pr-12" : "pr-4"}
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
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-400 font-medium"
        >
          {error}
        </motion.p>
      )}
      {hint && !error && <p className="text-xs text-slate-600">{hint}</p>}
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

/* ── Success overlay ──────────────────────────────────────── */
function SuccessOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col items-center justify-center
        bg-slate-950/80 backdrop-blur-sm rounded-[2rem] z-20 gap-4 px-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
      >
        <HiCheckCircle className="text-6xl text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" />
      </motion.div>
      <h3 className="text-xl font-extrabold text-white">Account created!</h3>
      <p className="text-sm text-slate-400">Redirecting to your dashboard…</p>
      <div className="w-6 h-6 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin mt-2" />
    </motion.div>
  );
}

/* ── Main Signup page ─────────────────────────────────────── */
export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    else if (form.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";

    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";

    if (!form.password) errs.password = "Password is required.";
    else if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";

    if (!form.confirm) errs.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password)
      errs.confirm = "Passwords do not match.";

    if (!agreed) errs.terms = "You must agree to the terms to continue.";

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

    /* ── Replace with your real registration API call ── */
    await new Promise((r) => setTimeout(r, 1400));

    localStorage.setItem("isAuthenticated", "true");
    setSuccess(true);
    setIsLoading(false);

    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background atmosphere */}
      <Orb className="w-[500px] h-[500px] bg-rose-600 -top-40 -right-32" />
      <Orb className="w-[450px] h-[450px] bg-orange-500 bottom-0 -left-28" />
      <Orb className="w-[350px] h-[350px] bg-amber-400 top-1/3 left-1/2 -translate-x-1/2" />

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
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-rose-500/20 to-orange-500/15 blur-2xl" />

        <div className="relative bg-white/6 backdrop-blur-2xl border border-white/12 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Success overlay */}
          <AnimatePresence>{success && <SuccessOverlay />}</AnimatePresence>

          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-7">
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
          <div className="text-center mb-7">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-slate-400 mt-1.5">
              Free forever. No credit card required.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Full name */}
            <InputField
              id="name"
              label="Full name"
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="Jane Doe"
              icon={HiUser}
              error={errors.name}
              autoComplete="name"
            />

            {/* Email */}
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

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <InputField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={set("password")}
                placeholder="Min. 8 characters"
                icon={HiLockClosed}
                error={errors.password}
                autoComplete="new-password"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="p-1 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <HiEyeOff className="text-lg" />
                    ) : (
                      <HiEye className="text-lg" />
                    )}
                  </button>
                }
              />
              <AnimatePresence>
                {form.password && <StrengthMeter password={form.password} />}
              </AnimatePresence>
            </div>

            {/* Confirm password */}
            <InputField
              id="confirm"
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              value={form.confirm}
              onChange={set("confirm")}
              placeholder="Repeat your password"
              icon={HiLockClosed}
              error={errors.confirm}
              autoComplete="new-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="p-1 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <HiEyeOff className="text-lg" />
                  ) : (
                    <HiEye className="text-lg" />
                  )}
                </button>
              }
            />

            {/* Terms checkbox */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      setErrors((p) => ({ ...p, terms: "" }));
                    }}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center
                      ${
                        agreed
                          ? "bg-gradient-to-br from-orange-400 to-rose-500 border-orange-400"
                          : "bg-white/6 border-white/20 group-hover:border-orange-400/50"
                      }`}
                  >
                    {agreed && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-400 leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.terms && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-400 font-medium pl-8"
                >
                  {errors.terms}
                </motion.p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
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
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get started free
                  <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </button>
          </form>

          <Divider text="or sign up with" />

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

          {/* Login link */}
          <p className="text-center text-sm text-slate-500 mt-7">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
