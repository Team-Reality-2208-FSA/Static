import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { statesData } from '../states.js'
import {fetchAllCounties, selectGeoLoading, findCounties, selectCounties} from '../store/CountySlice'
import MapMarker from "./MapMarker.js";





function Map() {
  const dispatch = useDispatch();
  const [onselect, setOnselect] = useState({});
  const [geoJson, setGeoJson] = useState({...statesData})
  const [stateLayer, setStateLayer] = useState(true)
  const loading = useSelector(selectGeoLoading)
  const counties = useSelector(selectCounties)
  
 
  useEffect(()=>{
    dispatch(fetchAllCounties())
  },[])
  

  const getColor = (d) => {
    return d > 1000
      ? "#800026"
      : d > 500
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  };

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const countystyle = (feature) =>{
    return {
      fillColor: "blue",
      weight:2,
      opacity:1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    }
  }
  
 
  function showCounties(e) {
    setStateLayer((st)=> !st)
    console.log(stateLayer)
    dispatch(findCounties(null))
    const layer = e.target;
    const density = e.target.feature.properties.density;
    const name = e.target.feature.properties.name
    const id = e.target.feature.id
    dispatch(findCounties(id))
  }

  const resetHighlight = (e) => {
    setOnselect({})
    e.target.setStyle(style(e.target.feature));
  };

  const showData = (e) =>{
    const layer = e.target
    const name = e.target.feature.properties.name
    const density = e.target.feature.properties.density
    const id = e.target.feature.id
    setOnselect({
      state: name,
      total: "Total goes here",
      crimeRate: "Crime rate goes here",
      population: "population goes here",
      density: density,
      id: id
    });
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: showData,
      mouseout: resetHighlight,
      click: showCounties,
    });
  };

  const mapStyle = {
    height: "80vh",
    width: "80%",
    margin: "0 auto",
  };

  return (
    <div className="map-container" >
      
      {!onselect.state ? (
        <div className="crime-info-hover">
          <strong>Static Crime Data</strong>
          <p>Hover on each State/County for more details</p>
        </div>
      ) : (
        <div className="crime-info-hover">
        <ul className="crime-info" >
          <li><strong>{onselect.state}</strong></li><br />
          <li>Crime Rate:{onselect.crimeRate}</li>
          <li>Total:{onselect.total}</li>
          <li>Murders:</li>
          <li>Assaults:</li>
          <li>Thefts:</li>
          <li>Population density:{onselect.density} people <br /> per square km</li>

        </ul>
        </div>
      )}
      
      <MapContainer
        className="mapView"
        center={[39,-96]}
        zoom={5}
        scrollWheelZoom={false}
        style={mapStyle}
      >
        <TileLayer
          attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {!loading && !stateLayer ? (
          <GeoJSON data={counties} style={countystyle}
          />) : null }
          <GeoJSON data={statesData} style={style} onEachFeature={onEachFeature}/>
        

      </MapContainer>
      <form className="stateInputForm">
        <label htmlFor="county"></label>
        <input type="text" name="county" placeholder="Enter county name" />
        <button
          type="submit"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          Find
        </button>
      </form>
    </div>
  );
}

export default Map;
