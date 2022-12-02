import React from "react";
import { ALLFBI } from "./";
import { Routes, Route } from "react-router-dom";
import Map from "./Map";
import { Link } from "react-router-dom";
import Stats from "./Stats";
import Team from "./Team";
/* 
    This is you entry point for your routes
*/
const Main = () => {
  return (
    <div>
      <nav>
        <div className="nav-leftSide">
          <Link className="links" to="/">
            <div>STATIC</div>
          </Link>
        </div>
        <div className="nav-middle-links">
          <Link className="links" to="/stats">
            <div>Stats</div>
          </Link>
          <Link className="links" to="/topTen">
            <div>Top 10 Most Wanted</div>
          </Link>
          <Link className="links" to="/topTen">
            <div>News Feed</div>
          </Link>
        </div>
        <Link className="links" to="topTen">
          <div>
            <button className="homePageLoginBtn">Login/Sign Up</button>
          </div>
        </Link>
      </nav>
      <main>{/* <h1>Welcome to Static!</h1> */}</main>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/FBI" element={<ALLFBI />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/team" element={<Team />} />
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
