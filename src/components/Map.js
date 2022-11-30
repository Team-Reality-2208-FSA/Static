import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { fetchFeatures } from "../store/mapSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { statesData } from "../states.js";

console.log(statesData);

function Map() {
  const dispatch = useDispatch();
  const [county, setCounty] = useState("");
  const [crimes, setCrimes] = useState([
    {
      type: "Bad",
      geo: [51.505, -0.09],
      id: 1,
    },
    {
      type: "REAL BAD",
      geo: [51.475, -0.095],
      id: 2,
    },
  ]);

  useEffect(() => {
    dispatch(fetchFeatures());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const mapStyle = {
    height: "80vh",
    width: "80%",
    margin: "0 auto",
  };

  return (
    <div className="map-container">
      <h1>Welcome to Static!</h1>

      <form className="zipCodeForm">
        <label>
          <input type="text" name="name" placeholder="Enter county name" />
        </label>
        <input type="submit" value="Find" />
      </form>

      <MapContainer
        className="mapView"
        center={[38, -96]}
        zoom={5}
        scrollWheelZoom={false}
        style={mapStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {statesData && <GeoJSON data={statesData} />}
        {crimes.map((crime) => (
          <Marker key={crime.id} position={crime.geo}>
            <Popup>{crime.type}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
