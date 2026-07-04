import { WiThermometer } from "react-icons/wi";

import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";

function MapLegend({ selectedLayer }) {
  if (selectedLayer === "temp") {
    return (
      <div className="map-legend">
        <h4>
          <WiThermometer />
          Temperature
        </h4>

        <div className="legend-item">
          <FaTemperatureLow />
          <span>Below 0°C</span>
        </div>

        <div className="legend-item">
          <span className="legend-color blue"></span>
          <span>10°C</span>
        </div>

        <div className="legend-item">
          <span className="legend-color green"></span>
          <span>20°C</span>
        </div>

        <div className="legend-item">
          <span className="legend-color orange"></span>
          <span>30°C</span>
        </div>

        <div className="legend-item">
          <FaTemperatureHigh />
          <span>40°C+</span>
        </div>
      </div>
    );
  }
  return null;
}

export default MapLegend;
