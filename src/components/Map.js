import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { statesData } from '../states.js'
import { fetchAllCounties, selectGeoLoading, findCounties, selectCounties, selectToggle } from '../store/CountySlice'
import { fetchStateData, selectStateData, findCrimeData, selectCrimes, crimeDataLoading } from "../store/stateDataslice.js";
import { Card } from "react-bootstrap"

function Map() {
  const dispatch = useDispatch();
  const [onselect, setOnselect] = useState({});
  const [stateLayer, setStateLayer] = useState(true)
  const loading = useSelector(selectGeoLoading)
  const counties = useSelector(selectCounties)
  const crimeData = useSelector(selectStateData)
  const crimes = useSelector(selectCrimes)
  const crimeLoading = useSelector(crimeDataLoading)

  useEffect(() => {
    dispatch(fetchAllCounties())
    dispatch(fetchStateData())
  }, [])

  const getColor = (d, name) => {
    return (
    d > 80 ? "#800026": 
    d > 70 ? "#BD0026": 
    d > 60 ? "#E31A1C": 
    d > 50 ? "#FC4E2A": 
    d > 40 ? "#FD8D3C": 
    d > 30 ? "#FEB24C":
    d > 20 ? "#FED976": "#FFEDA0");
  };

  const style = (feature) => {
    const state = crimeData[feature.id - 1]
    let CR = 0
    let name = ''
    if (state) {
      let population = state.results[0].population
      let totalCrimes = state.results[0].property_crime + state.results[0].violent_crime
      CR = Math.floor((population / totalCrimes))
      name = state.results[0].state_abbr
    }
    return {
      fillColor: getColor(CR,name),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const countystyle = (feature) => {
    return {
      fillColor: "blue",
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    }
  }


  // function showCounties(e) {
  //   setStateLayer((st) => !st)
  //   console.log(stateLayer)
  //   dispatch(findCounties(null))
  //   const layer = e.target;
  //   const density = e.target.feature.properties.density;
  //   const name = e.target.feature.properties.name
  //   const id = e.target.feature.id
  //   console.log(id)
  //   dispatch(findCounties(id))
  // }

  const resetHighlight = (e) => {
    setOnselect({})
    e.target.setStyle(style(e.target.feature));
  };

  const showData = (e) => {
    const name = e.target.feature.properties.name
    const density = e.target.feature.properties.density
    let id = e.target.feature.id

    const obj = {
      state: name,
      total: "Total goes here",
      crimeRate: "Crime rate goes here",
      population: "population goes here",
      density: density,
      id: id
    };
    setOnselect({ state: "yeah" })
    dispatch(findCrimeData(obj))
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: showData,
      mouseout: resetHighlight,
      // click: showCounties,
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
        <Card className="crime-info-hover">
          <strong>Static Crime Data</strong>
          <p>Hover on each State/County for more details</p>
        </Card>
      ) : (
        <Card className="crime-info-hover">
          <ul className="crime-info" >
            <li><strong>{crimes.name}</strong></li><br />
            <li>Crime Rate:{Math.floor(crimes.crimeRate * 100) / 100}</li>
            <li>Total:{crimes.data.results[0].property_crime + crimes.data.results[0].violent_crime}</li>
            <li>Murders:{crimes.data.results[0].homicide}</li>
            <li>Assaults:{crimes.data.results[0].aggravated_assault}</li>
            <li>burglary:{crimes.data.results[0].burglary}</li>
            <li>Population:{crimes.data.results[0].population}</li>
            <li>Pop-density:{crimes.density} people <br /> per square km</li>
          </ul>
        </Card>
      )}

      <MapContainer
        className="mapView"
        center={[39, -96]}
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
          />) : null}
        {crimeData && !crimeLoading ?
          <GeoJSON data={statesData} style={style} onEachFeature={onEachFeature} /> : null
        }
      </MapContainer>
      {/* <form className="stateInputForm">
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
      </form> */}
    </div>
  );
}

export default Map;
