import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statesData } from "../states.js";
import {
  fetchAllCounties,
  selectGeoLoading,
  findCounties,
  selectCounties,
  selectToggle,
} from "../store/CountySlice";
import {
  fetchStateData,
  selectStateData,
  findCrimeData,
  selectCrimes,
  crimeDataLoading,
} from "../store/stateDataslice.js";
import {
  Card,
  Container,
  Collapse,
  Accordion,
  Row,
  Col,
} from "react-bootstrap";

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
    dispatch(fetchAllCounties());
    dispatch(fetchStateData());
  }, []);

  const getColor = (d) => {
    if(filter === "Crime Rate") {
    return (
        d > 80 ? "#800026" :
        d > 70 ? "#BD0026" :
        d > 60 ? "#E31A1C" :
        d > 50 ? "#FC4E2A" :
        d > 40 ? "#FD8D3C" :
        d > 30 ? "#FEB24C" :
        d > 20 ? "#FED976" : "#FFEDA0");}
    if(filter === 'Homicide') {
      
      return (
        d > 100 ? "#800026" :
        d > 80 ? "#BD0026" :
        d > 60 ? "#E31A1C" :
        d > 40 ? "#FC4E2A" :
        d > 20 ? "#FD8D3C" :
        d > 15 ? "#FEB24C" :
        d > 10 ? "#FED976" : "#FFEDA0");
    }
    if(filter === "Assault") {
      console.log(d)
      return (
        d > 150 ? "#800026" :
        d > 100 ? "#BD0026" :
        d > 80 ? "#E31A1C" :
        d > 60 ? "#FC4E2A" :
        d > 40 ? "#FD8D3C" :
        d > 20 ? "#FEB24C" :
        d > 10 ? "#FED976" : "#FFEDA0");
    }
    if(filter === "Arson") {
      console.log(d)
      return (
        d > 200 ? "#800026" :
        d > 150 ? "#BD0026" :
        d > 100 ? "#E31A1C" :
        d > 70 ? "#FC4E2A" :
        d > 50 ? "#FD8D3C" :
        d > 20 ? "#FEB24C" :
        d > 10 ? "#FED976" : "#FFEDA0");
    }
    if(filter === "Robbery") {
      console.log(d)
      return (
        d > 80 ? "#800026" :
        d > 70 ? "#BD0026" :
        d > 60 ? "#E31A1C" :
        d > 50 ? "#FC4E2A" :
        d > 40 ? "#FD8D3C" :
        d > 30 ? "#FEB24C" :
        d > 15 ? "#FED976" : "#FFEDA0");
    }
    if(filter === "Larceny") {
      console.log(d)
      return (
        d > 120 ? "#800026" :
        d > 100 ? "#BD0026" :
        d > 90 ? "#E31A1C" :
        d > 80 ? "#FC4E2A" :
        d > 70 ? "#FD8D3C" :
        d > 60 ? "#FEB24C" :
        d > 50 ? "#FED976" : "#FFEDA0");
    }
    if(filter === "Rape") {
      console.log(d)
      return (
        d > 70 ? "#800026" :
        d > 60 ? "#BD0026" :
        d > 50 ? "#E31A1C" :
        d > 40 ? "#FC4E2A" :
        d > 30 ? "#FD8D3C" :
        d > 20 ? "#FEB24C" :
        d > 10 ? "#FED976" : "#FFEDA0");
    }
    };


  const style = (feature) => {
    const state = crimeData[feature.id - 1]
    let CR = 0
    let val = ''
    if (state) {
      let population = state.results[0].population
      let totalCrimes = state.results[0].property_crime + state.results[0].violent_crime
      CR = Math.floor((population / totalCrimes))
      
      switch(filter){
        case "Homicide":
          val = Math.floor((population / state.results[0].homicide)) / 1000;
          break;
        case "Assault" :
          val = Math.floor((population / state.results[0].aggravated_assault)) / 10;
          break;
        case "Arson" :
          val = Math.floor((population / state.results[0].arson)) / 100;
          break;
        case "Larceny" :
          val = Math.floor((population / state.results[0].larceny));
          break;
        case "Rape" :
          val = Math.floor((population / state.results[0].rape_revised)) / 100;
          break;
        default:
          val = CR
      }
    }
    return {
      fillColor: getColor(val),
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
    };
  };

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
    const name = e.target.feature.properties.name;
    const density = e.target.feature.properties.density;
    let id = e.target.feature.id;

    const obj = {
      state: name,
      total: "Total goes here",
      crimeRate: "Crime rate goes here",
      population: "population goes here",
      density: density,
      id: id,
    };
    setOnselect({ state: "yeah" });
    dispatch(findCrimeData(obj));
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: showData,
      mouseout: resetHighlight,
      // click: showCounties,
    });
  };

  const handleYearChange = (e) => {
    console.log(e.target.value)
  }

  const handleCrimeChange = (e) => {
    console.log(e.target.value)
  }

  const mapStyle = {
    height: "80vh",
    width: "80%",
    margin: "0 auto",
  };

  return (
    <Container className="map" fluid>
      <Row>
        <Col xs={8}>
          <MapContainer
            className="mapView"
            center={[39, -95]}
            zoom={4}
            scrollWheelZoom={false}
            style={mapStyle}
          >
            <TileLayer
              attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
            {!loading && !stateLayer ? (
              <GeoJSON data={counties} style={countystyle} />
            ) : null}
            {crimeData && !crimeLoading ? (
              <GeoJSON
                data={statesData}
                style={style}
                onEachFeature={onEachFeature}
              />
            ) : null}
          </MapContainer>
        </Col>
        <Col>
          {/* <Card> */}
            <Card.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Year:2020</Accordion.Header>
                  <Accordion.Body>
                    1985-2020:
                    <input onChange={(e) => handleYearChange(e)}></input>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Crime:All</Accordion.Header>
                  <Accordion.Body>
                    <select onChange={(e) => handleCrimeChange(e)}>
                      <option value="All">All</option>
                      <option value="homicide">Homicide</option>
                      <option value="assault">Assault</option>
                      <option value="robbery">Robbery</option>
                      <option value="arson">Arson</option>
                      <option value="larcency">Larceny</option>
                      <option value="rape">Rape</option>
                    </select>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          {/* </Card> */}
          <div>
          
            <Collapse in={onselect.state} dimension="width">
            {!onselect.state ? (
              <Card className="crime-info-hover">
                <strong>Static Crime Data</strong>
                <p>Hover on each State/County for more details</p>
              </Card>
            
          ) : (
            
              <Card className="crime-info-hover">
                <Card.Body>
                <Card.Title><strong>{crimes.name}</strong></Card.Title>
                <ul className="crime-info" >
                  
                  <li><h4>Crime Rate:{Math.floor(crimes.crimeRate * 100) / 100}</h4></li>
                  <li><h4>Total:{crimes.data.results[0].property_crime + crimes.data.results[0].violent_crime}</h4></li>
                  <li><h4>Murders:{crimes.data.results[0].homicide}</h4></li>
                  <li><h4>Assaults:{crimes.data.results[0].aggravated_assault}</h4></li>
                  <li><h4>burglary:{crimes.data.results[0].burglary}</h4></li>
                  <li><h4>Population:{crimes.data.results[0].population}</h4></li>
                  <li><h4>Pop-density:{crimes.density} people <br /> per square km</h4></li>
                </ul>
                </Card.Body>
              </Card>
          )}
          </Collapse>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Map;
