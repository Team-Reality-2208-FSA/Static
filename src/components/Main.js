import React from "react";

import { Routes, Route } from "react-router-dom";
import Map from "./Map";
import { Link } from "react-router-dom";
import Stats from "./Stats";
import Team from "./Team";
import Homepage from "./Homepage";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import Newsfeed from "./newsfeed.js";


/* 
    This is you entry point for your routes
*/
const Main = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" >
        <Container fluid>
          <Navbar.Brand href="/">S T A T I C</Navbar.Brand>
          <Nav className="nav-middle-links">
            <Nav.Link href="stats">Stats</Nav.Link>
            <Nav.Link href="map">Map</Nav.Link>
            <Nav.Link href="newsfeed">News Feed</Nav.Link>
          </Nav>
          <NavDropdown title="Login / Sign Up">
            <NavDropdown.Item>Login</NavDropdown.Item>
            <NavDropdown.Item>SignUp</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >Log Out</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/map" element={<Map />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/team" element={<Team />} />
        <Route path="/newsfeed" element={<Newsfeed />} />
      </Routes>
      <footer>
        <div className="footer-column-name">
          <div>S</div>
          <div>T</div>
          <div>A</div>
          <div>T</div>
          <div>I</div>
          <div>C</div>
        </div>
        <div className="footer-column">
          <div>FOLLOW US</div>
          <div>
            <img
              className="footer-icon"
              src="https://cdn-icons-png.flaticon.com/512/4406/4406220.png"
            ></img>
          </div>
          <div>
            <img
              className="footer-icon"
              src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png"
            ></img>
          </div>
          <div>
            <img
              className="footer-icon"
              src="https://cdn-icons-png.flaticon.com/512/536/536452.png"
            ></img>
          </div>
        </div>
        <div className="footer-column">
          <div>API CREDIT</div>
          <Link className="links">
            <div>Map</div>
          </Link>
          <Link className="links">
            <div>Crime Data</div>
          </Link>

          <Link className="links">
            <div>News Articles</div>
          </Link>
        </div>
        <div className="footer-column footer-column-aboutUs">
          <div>ABOUT US</div>
          <Link to="/team" className="links">
            <div>The Team</div>
          </Link>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </footer>
    </div>
  );
};

export default Main;
