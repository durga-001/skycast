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

/* ─────────────────────────────────────────────
   PRIMITIVES
───────────────────────────────────────────── */

function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-25 pointer-events-none ${className}`}
    />
  );
}

export function InputField({
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
          } rounded-2xl pl-11 ${rightElement ? "pr-12" : "pr-4"} py-3.5
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
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-rose-400 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete = "current-password",
}) {
  const [show, setShow] = useState(false);
  return (
    <InputField
      id={id}
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder="••••••••"
      icon={HiLockClosed}
      error={error}
      autoComplete={autoComplete}
      rightElement={
        <button
          type="button"
          onClick={() => setShow((p) => !p)}
          className="p-1 text-slate-500 hover:text-slate-300 transition-colors duration-200"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <HiEyeOff className="text-lg" />
          ) : (
            <HiEye className="text-lg" />
          )}
        </button>
      }
    />
  );
}

export function StrengthMeter({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const barColor = [
    "",
    "bg-rose-500",
    "bg-amber-400",
    "bg-orange-400",
    "bg-emerald-400",
  ][score];
  const textColor = [
    "",
    "text-rose-400",
    "text-amber-400",
    "text-orange-400",
    "text-emerald-400",
  ][score];
  const label = ["", "Weak", "Fair", "Good", "Strong"][score];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-2 mt-0.5"
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? barColor : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {checks.map(({ label: l, pass }) => (
          <span
            key={l}
            className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-200 ${
              pass ? "text-emerald-400" : "text-slate-600"
            }`}
          >
            <HiCheckCircle
              className={`text-sm shrink-0 ${pass ? "opacity-100" : "opacity-30"}`}
            />
            {l}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function TermsCheckbox({ checked, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5 shrink-0">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center ${
              checked
                ? "bg-gradient-to-br from-orange-400 to-rose-500 border-orange-400"
                : "bg-white/6 border-white/20 group-hover:border-orange-400/50"
            }`}
          >
            {checked && (
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
            className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </span>
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-rose-400 font-medium pl-8"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function OAuthButtons() {
  const providers = [
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
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {providers.map(({ label, logo }) => (
        <button
          key={label}
          type="button"
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl
            bg-white/6 hover:bg-white/10 border border-white/10 hover:border-white/18
            text-sm font-medium text-slate-300 hover:text-white transition-all duration-200"
        >
          {logo}
          {label}
        </button>
      ))}
    </div>
  );
}

export function AuthDivider({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-white/8" />
      <span className="text-xs text-slate-600 font-medium">{text}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

export function SubmitButton({ isLoading, loadingText, children }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative w-full flex items-center justify-center gap-2
        px-6 py-4 rounded-2xl font-semibold text-sm text-slate-950
        bg-gradient-to-r from-orange-400 to-rose-500
        hover:from-orange-300 hover:to-rose-400
        disabled:opacity-60 disabled:cursor-not-allowed
        shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
        transition-all duration-300"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
          {loadingText}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {children}
          <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   AUTH CARD SHELL
   Wraps any auth form in the shared glass card
───────────────────────────────────────────── */
export function AuthCard({ mode = "login", children }) {
  const isLogin = mode === "login";

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background orbs */}
      <Orb
        className={`w-[500px] h-[500px] ${isLogin ? "bg-orange-500 -top-40 -left-32" : "bg-rose-600 -top-40 -right-32"}`}
      />
      <Orb
        className={`w-[400px] h-[400px] ${isLogin ? "bg-rose-600 bottom-0 -right-28" : "bg-orange-500 bottom-0 -left-28"}`}
      />
      <Orb className="w-[300px] h-[300px] bg-amber-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Dot grid */}
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
        {/* Glow */}
        <div
          className={`absolute -inset-1 rounded-[2rem] blur-2xl bg-gradient-to-br ${
            isLogin
              ? "from-orange-500/20 to-rose-500/15"
              : "from-rose-500/20 to-orange-500/15"
          }`}
        />

        <div className="relative bg-white/6 backdrop-blur-2xl border border-white/12 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-7">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-500/40 blur-lg" />
              <WiDaySunny className="relative text-5xl text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
            </div>
            <Link to="/" className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Sky</span>
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
                Cast
              </span>
            </Link>
          </div>

          {children}

          {/* Bottom link */}
          <p className="text-center text-sm text-slate-500 mt-7">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
                >
                  Sign up free
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
                >
                  Log in
                </Link>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOGIN FORM  (self-contained, uses AuthCard)
───────────────────────────────────────────── */
function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setAuthError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
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
    <>
      <div className="text-center mb-7">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 mt-1.5">
          Log in to access your weather dashboard.
        </p>
      </div>

      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-5 px-4 py-3 rounded-2xl bg-rose-500/12 border border-rose-500/25 text-sm text-rose-400 text-center font-medium"
          >
            {authError}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
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
        <PasswordField
          id="password"
          label="Password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
        />
        <div className="flex justify-end -mt-1">
          <a
            href="#"
            className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
          >
            Forgot password?
          </a>
        </div>
        <SubmitButton isLoading={isLoading} loadingText="Signing in…">
          Log in
        </SubmitButton>
      </form>

      <div className="mt-5">
        <AuthDivider text="or continue with" />
      </div>
      <div className="mt-5">
        <OAuthButtons />
      </div>
      <p className="text-center text-xs text-slate-600 mt-4">
        Demo: <span className="text-slate-400">demo@skycast.app</span> /{" "}
        <span className="text-slate-400">password123</span>
      </p>
    </>
  );
}

/* ─────────────────────────────────────────────
   SIGNUP FORM  (self-contained, uses AuthCard)
───────────────────────────────────────────── */
function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Full name is required (min 2 chars).";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email.";
    if (!form.password || form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (form.confirm !== form.password)
      errs.confirm = "Passwords do not match.";
    if (!agreed) errs.terms = "You must agree to the terms.";
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
    await new Promise((r) => setTimeout(r, 1400));
    localStorage.setItem("isAuthenticated", "true");
    setSuccess(true);
    setIsLoading(false);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <>
      {/* Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
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
            <h3 className="text-xl font-extrabold text-white">
              Account created!
            </h3>
            <p className="text-sm text-slate-400">
              Redirecting to your dashboard…
            </p>
            <div className="w-6 h-6 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin mt-2" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-7">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-slate-400 mt-1.5">
          Free forever. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="password"
            label="Password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            autoComplete="new-password"
          />
          <AnimatePresence>
            {form.password && <StrengthMeter password={form.password} />}
          </AnimatePresence>
        </div>
        <PasswordField
          id="confirm"
          label="Confirm password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          autoComplete="new-password"
        />
        <TermsCheckbox
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            setErrors((p) => ({ ...p, terms: "" }));
          }}
          error={errors.terms}
        />
        <SubmitButton isLoading={isLoading} loadingText="Creating account…">
          Get started free
        </SubmitButton>
      </form>

      <div className="mt-5">
        <AuthDivider text="or sign up with" />
      </div>
      <div className="mt-5">
        <OAuthButtons />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   DEFAULT EXPORT — unified AuthForm
   Usage:
     <AuthForm mode="login" />
     <AuthForm mode="signup" />
───────────────────────────────────────────── */
export default function AuthForm({ mode = "login" }) {
  return (
    <AuthCard mode={mode}>
      {mode === "login" ? <LoginForm /> : <SignupForm />}
    </AuthCard>
  );
}
