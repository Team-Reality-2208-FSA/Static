import React from "react";
import { Link } from "react-router-dom";

const Footer = ()=> {
    return (
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
          <Link className="links">
            <div>The Team</div>
          </Link>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </footer>
    )
}

export default Footer