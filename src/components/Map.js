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
    <div style={{ background: "red", height: 300 }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 300, width: 300 }}
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
