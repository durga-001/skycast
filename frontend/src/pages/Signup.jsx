// pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!values.fullName.trim()) errs.fullName = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(values.email)) errs.email = "Enter a valid email";
    if (!values.password || values.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (values.confirmPassword !== values.password)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)]">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 pt-24">
        <AuthForm
          title="Create Account"
          subtitle="Join SkyCast for real-time weather insights"
          fields={[
            {
              name: "fullName",
              label: "Full Name",
              type: "text",
              placeholder: "John Doe",
            },
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
            {
              name: "confirmPassword",
              label: "Confirm Password",
              type: "password",
              placeholder: "••••••••",
            },
          ]}
          values={values}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Sign Up"
          footer={
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:underline">
                Login
              </Link>
            </>
          }
        />
      </div>
    </div>
  );
}
