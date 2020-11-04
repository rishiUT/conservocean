import React from "react";
import { Link, NavLink } from "react-router-dom";
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
            <NavLink to="/about" className={"nav-link"} activeClassName="active">
              About
            </NavLink>
          </li>
          <li className={"nav-item"}>
            <NavLink to="/species" className={"nav-link"} activeClassName="active">
              Species
            </NavLink>
          </li>
          <li className={"nav-item"}>
            <NavLink to="/water-bodies" className={"nav-link"} activeClassName="active">
              Bodies of Water
            </NavLink>
          </li>
          <li className={"nav-item"}>
            <NavLink to="/impacts" className={"nav-link"} activeClassName="active">
              Human Impacts
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
