import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const crimes = [
  {
    type: "Bad",
    geo: [51.505, -0.09],
  },
  {
    type: "REAL BAD",
    geo: [51.475, -0.095],
  },
];

function Map() {
  return (
    <div className="map-container">
      <form className="zipCodeForm">
        <label>
          <input type="text" name="name" placeholder="Enter county name" />
        </label>
        <input type="submit" value="Find" />
      </form>

      <MapContainer
        className="mapView"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 500, width: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {crimes.map((crime) => (
          <Marker position={crime.geo}>
            <Popup>{crime.type}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
