import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiMail,
  HiLockClosed,
  HiUser,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";
import { toast } from "react-toastify";

import "../styles/auth.css";

import {
  loginUser,
  registerUser,
} from "../services/authService";

export default function AuthForm({ mode = "login" }) {
  const navigate = useNavigate();

  const isLogin = mode === "login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Signup only
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm Password (Signup only)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };

    const getPasswordStrength = () => {
      const password = formData.password;

      let score = 0;

      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score <= 1)
        return {
          label: "Weak",
          bars: 1,
        };

      if (score === 2)
        return {
          label: "Fair",
          bars: 2,
        };

      if (score === 3)
        return {
          label: "Good",
          bars: 3,
        };

      return {
        label: "Strong",
        bars: 4,
      };
    };

    const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await loginUser({
          email: formData.email,
          password: formData.password,
        });

        toast.success("Login successful!");
      } else {
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        toast.success("Account created successfully!");
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      // Backend validation errors
      if (error.response?.data?.errors) {
        const backendErrors = {};

        error.response.data.errors.forEach((err) => {
          const field = err.path || err.param;

          if (field) {
            backendErrors[field] = err.msg;
          }
        });

        setErrors(backendErrors);

        return;
      }

      // Other backend errors
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow"></div>

      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <WiDaySunny />
          </div>

          <h1>
            Sky<span>Cast</span>
          </h1>
        </div>

        <div className="auth-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

          <p>
            {isLogin
              ? "Login to continue to your dashboard."
              : "Create your account to get started."}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>

              <div className="input-wrapper">
                <HiUser className="input-icon" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="name"
                />
              </div>

              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>

            <div className="input-wrapper">
              <HiMail className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                autoComplete="email"
              />
            </div>

            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>

            <div className="input-wrapper">
              <HiLockClosed className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                autoComplete={isLogin ? "current-password" : "new-password"}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>

            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>

              <div className="input-wrapper">
                <HiLockClosed className="input-icon" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="field-error">{errors.confirmPassword}</p>
              )}
            </div>
          )}
          {!isLogin && formData.password && (
            <div className="password-strength">
              <small>
                Password Strength :<strong> {strength.label}</strong>
              </small>

              <div className="strength-bars">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className={bar <= strength.bars ? "active" : ""}
                  />
                ))}
              </div>
            </div>
          )}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>

                {isLogin ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              <>{isLogin ? "Login" : "Create Account"}</>
            )}
          </button>
        </form>
        <div className="auth-footer">
          {isLogin ? (
            <>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}