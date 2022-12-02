import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { statesData } from '../states.js'
import {fetchCounties, selectGeoJson, selectGeoLoading} from '../store/CountySlice'




function Map() {
  const dispatch = useDispatch()
  const [onselect, setOnselect] = useState({});
  const [center, setCenter] = useState([38, -96])
  //const map = useMap()
  console.log("this is the center",center)
  const counties = useSelector(selectGeoJson)
  const loading = useSelector(selectGeoLoading)
  
  useEffect(()=>{
    dispatch(fetchCounties('New York'))
  },[])

  /* function determining what should happen onmouseover, this function updates our state*/
  const getColor = (d) => { // here define what crime rate ranges match which color
    return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
          d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  }

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.density), // how to set the color based on a variable
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  function highlightFeature(e) { // properties of the selected state are named here
    const layer = e.target;
    const Density = e.target.feature.properties.density
    setOnselect({
      county: "County goes here",
      total: "Total goes here",
      crimeRate: "Crime rate goes here",
      population: "population goes here",
      density: Density
    })

    layer.setStyle({
      weight: 5,
      color: "blue",
      fillOpacity: 9
    });
  }

  const resetHighlight = (e) => {
    setOnselect({});
    e.target.setStyle(style(e.target.feature));
  }

  const showCounties = (e) =>{
    const layer = e.target
    const state = e.target.feature.properties.name
    const cords = e.latlng
    const lat = Math.floor(cords.lat)
    const lng = Math.floor(cords.lng)
    console.log(lat,lng)
    setCenter([lat,lng])
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: showCounties,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const mapStyle = {
    height: '80vh',
    width: '80%',
    margin: '0 auto',
  }


  return (
    <div className="map-container" >
      
      {!onselect.county ? (
        <div className="crime-info-hover">
          <strong>Static Crime Data</strong>
          <p>Hover on each State/County for more details</p>
        </div>
      ) : (
        <div className="crime-info-hover">
        <ul className="crime-info" >
          <li><strong>{onselect.county}</strong></li><br />
          <li>Crime Rate:{onselect.total}</li>
          <li>Murders{onselect.male}</li>
          <li>Assaults{onselect.female}</li>
          <li>Thefts{onselect.intersex}</li>
          <li>Population density:{onselect.density} people <br /> per square km</li>
        </ul>
        </div>
      )}
      
      <MapContainer
        className="mapView"
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        style={mapStyle}
      >
        <TileLayer
          attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {!loading ? (
          <GeoJSON data={statesData} style={style} onEachFeature={onEachFeature}
          />) : null }
      </MapContainer>
      <form className="zipCodeForm">
        <label htmlFor="county"></label>
        <input type="text" name="county" placeholder="Enter county name" />
        <button type="submit" onSubmit={(e) => { handleSubmit(e) }}>Find</button>
      </form>
    </div>
  );
}

export default Map;
