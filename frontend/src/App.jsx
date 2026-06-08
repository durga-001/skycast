import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Delhi");
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/weather/${city}`);

      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const saveLocation = async () => {
    try {
      await axios.post("http://localhost:5000/locations", {
        city_name: city,
        country: "Unknown",
      });

      toast.success("City Saved!");
    } catch (error) {
      toast.error("Failed to save city");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Weather Dashboard
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            size="small"
          />

          <Button variant="contained" onClick={fetchWeather} sx={{ ml: 2 }}>
            Search
          </Button>
          <Button variant="outlined" onClick={saveLocation} sx={{ ml: 2 }}>
            Save City
          </Button>
        </div>
        {weather && (
          <Card>
            <CardContent>
              <Typography variant="h5">{weather.city}</Typography>

              <Typography>Temperature: {weather.temperature}°C</Typography>

              <Typography>Humidity: {weather.humidity}%</Typography>

              <Typography>Wind Speed: {weather.wind_speed} m/s</Typography>

              <Typography>Condition: {weather.weather}</Typography>
            </CardContent>
          </Card>
        )}
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
