import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className={"navbar navbar-expand-lg navbar-custom sticky-top"}>
      <Link to="/" className={"navbar-brand"}>
        ConservOcean
      </Link>

      <button
        className={"navbar-toggler"}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={"navbar-toggler-icon"}></span>
      </button>

      <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
        <ul className={"navbar-nav mr-auto"}>
          <li className={"nav-item"}>
            <Link to="/about" className={"nav-link"}>
              About
            </Link>
          </li>
          <li className={"nav-item"}>
            <Link to="/species" className={"nav-link"}>
              Species
            </Link>
          </li>
          <li className={"nav-item"}>
            <Link to="/water-bodies" className={"nav-link"}>
              Bodies of Water
            </Link>
          </li>
          <li className={"nav-item"}>
            <Link to="/impacts" className={"nav-link"}>
              Human Impacts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
