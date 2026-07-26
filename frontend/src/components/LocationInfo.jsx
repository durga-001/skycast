import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";

function LocationInfo({ city, latitude, longitude, selectedLayer }) {
  return (
    <div className="location-info">
      <h4>
        <FaMapMarkerAlt />
        Location Details
      </h4>

      <p>
        <strong>City:</strong> {city}
      </p>

      <p>
        <MdMyLocation />
        {latitude?.toFixed(4)}
      </p>

      <p>
        <MdMyLocation />
        {longitude?.toFixed(4)}
      </p>

      <p>
        <strong>Layer:</strong> {selectedLayer?.toUpperCase()}
      </p>
    </div>
  );
}

export default LocationInfo;
