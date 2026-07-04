import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getCurrentUser } from "../services/authService";
import "../styles/auth.css";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}
