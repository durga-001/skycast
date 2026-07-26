import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";

function OceanLocationInfo({ lat, lon, selectedLayer }) {
  return (
    <div className="location-info">
      <h4>
        <FaMapMarkerAlt />
        Location Details
      </h4>

      <p>
        <MdMyLocation />
        {lat?.toFixed(4)}
      </p>

      <p>
        <MdMyLocation />
        {lon?.toFixed(4)}
      </p>

      <p>
        <strong>Layer:</strong> {selectedLayer?.toUpperCase()}
      </p>
    </div>
  );
}

export default OceanLocationInfo;
