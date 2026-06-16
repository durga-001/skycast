
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Dashboard from "../pages/Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherMapPage from "../pages/WeatherMapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/weather-map"
          element={<WeatherMapPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
