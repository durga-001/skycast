import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import WeatherMapPage from "./pages/WeatherMapPage";
import OutfitPage from "./pages/OutfitPage";
import "./index.css";
import "./styles/home.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes having Navbar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/weather-map" element={<WeatherMapPage />} />

          <Route path="/outfit" element={<OutfitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
