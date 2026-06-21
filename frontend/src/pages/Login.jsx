// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = "Enter a valid email";
    if (!values.password || values.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)]">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 pt-24">
        <AuthForm
          title="Welcome Back"
          subtitle="Login to access your weather dashboard"
          fields={[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "you@example.com",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "••••••••",
            },
          ]}
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Login"
          extra={
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-cyan-500"
              />
              Remember Me
            </label>
          }
          footer={
            <>
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-400 hover:underline">
                Signup
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
