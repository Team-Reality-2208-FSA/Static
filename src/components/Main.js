import React from "react";
import { ALLFBI } from "./";
import { Routes, Route } from "react-router-dom";
import Map from "./Map";
import { Link } from "react-router-dom";
/* 
    This is you entry point for your routes
*/
const Main = () => {
  return (
    <div>
      <nav>
        <div className="nav-leftSide">
          <Link className="links" to path="/">
            <div>STATIC</div>
          </Link>
        </div>
        <div className="nav-middle-links">
          <Link className="links" to path="/stats">
            <div>Stats</div>
          </Link>
          <Link className="links" to path="topTen">
            <div>Top 10 Most Wanted</div>
          </Link>
          <Link className="links" to path="topTen">
            <div>News Feed</div>
          </Link>
        </div>
        <Link className="links" to path="topTen">
          <div>
            <button className="homePageLoginBtn">Login/Sign Up</button>
          </div>
        </Link>
      </nav>
      <main>
        <h1>Welcome to Static!</h1>
      </main>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/FBI" element={<ALLFBI />} />
      </Routes>
    </div>
  );
};

export default Main;
