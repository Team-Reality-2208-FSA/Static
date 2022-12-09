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

    console.log(year)
  useEffect(() => {
    dispatch(fetchAllCounties());
    dispatch(fetchStateData());
  }, []);

  const getColor = (d, name) => {
    return (
      d > 80 ? "#800026" :
        d > 70 ? "#BD0026" :
          d > 60 ? "#E31A1C" :
            d > 50 ? "#FC4E2A" :
              d > 40 ? "#FD8D3C" :
                d > 30 ? "#FEB24C" :
                  d > 20 ? "#FED976" : "#FFEDA0");
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

                      <option value="Crime Rate">Crime Rate</option>
                      <option value="Homicide">Homicide</option>
                      <option value="Assault">Assault</option>
                      <option value="Robbery">Robbery</option>
                      <option value="Arson">Arson</option>
                      <option value="Larceny">Larceny</option>
                      {year ? JSON.parse(year) < 2013 ? null : <option value="Rape">Rape</option> : null}

                    </select>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <br></br>
              <Button onClick={handleSubmit}>View</Button>

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
                  

                  <Row><Col><h4>Crime Rate:</h4></Col><Col><Badge bg="danger">{Math.floor(crimes.crimeRate * 100) / 100}</Badge></Col></Row>
                  <Row><Col><h4>Total Crimes:</h4></Col><Col><Badge>{(crimes.data.results[0].property_crime + crimes.data.results[0].violent_crime).toLocaleString("en-US")}</Badge></Col></Row>
                  <Row><Col><h4>Homicide:</h4></Col><Col><Badge>{(crimes.data.results[0].homicide).toLocaleString('en-US')}</Badge></Col></Row>
                  <Row><Col><h4>Assault:</h4></Col><Col><Badge>{(crimes.data.results[0].aggravated_assault).toLocaleString('en-US')}</Badge></Col></Row>
                  <Row><Col><h4>Robbery:</h4></Col><Col><Badge>{(crimes.data.results[0].robbery).toLocaleString('en-US')}</Badge></Col></Row>
                  <Row><Col><h4>Larceny:</h4></Col><Col> <Badge>{(crimes.data.results[0].larceny).toLocaleString('en-US')}</Badge></Col></Row>
                  {crimes.data.results[0].rape_revised > 0 ? <Row><Col><h4>Rape:</h4></Col><Col> <Badge>{(crimes.data.results[0].rape_revised).toLocaleString()}</Badge></Col></Row> : null }
                  <Row><Col><h4>Population:</h4></Col><Col> <Badge>{(crimes.data.results[0].population)}</Badge></Col></Row>
                  <Row><Col><h4>Density:</h4></Col><Col> <Badge>{crimes.density}</Badge> <br /> people per square km</Col></Row>
                </Container>

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
