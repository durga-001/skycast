import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import WeatherMapPage from "./pages/WeatherMapPage";
import OutfitPage from "./pages/OutfitPage";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./styles/home.css";
import OceanMapPage from "./components/OceanMapPage";
import OceanDashboard from "./pages/OceanDashboard";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/weather-map" element={<WeatherMapPage />} />
            <Route path="/outfit" element={<OutfitPage />} />
            <Route path="/ocean-dashboard" element={<OceanDashboard />} />
            <Route path="/ocean-map" element={<OceanMapPage />} />

            {/* Optional 404 */}
            <Route
              path="*"
              element={
                <div
                  style={{
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <h2>404 | Page Not Found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
