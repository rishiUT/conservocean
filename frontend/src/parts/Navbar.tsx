import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import fish from "../pages/Media/whitefish.png";

// Creates a bar with links to the model pages, about page, and home page.
// This is used on the top of our site.
export default function Navbar() {
  const navbarelems = [
    { link: "/about", text: "\nAbout" },
    { link: "#", text: "\n – " },
    { link: "/species", text: "\nSpecies" },
    { link: "/water-bodies", text: "\nBodies of Water" },
    { link: "/impacts", text: "\nHuman Impacts" },
    { link: "#", text: "\n – " },
    { link: "/visualizations", text: "\nVisualizations" },
    { link: "/provider-visualizations", text: "\nHomeFarmer" },
  ];

  function makeNavBar() {
    return navbarelems.map((navbarelem) => (
      <li key={navbarelem.text} className={"nav-item"}>
        <NavLink
          to={navbarelem.link}
          className={"nav-link"}
          activeClassName="active"
        >
          {navbarelem.text}
        </NavLink>
      </li>
    ));
  }

  return (
    <nav className={"navbar navbar-expand-lg navbar-custom sticky-top"}>
      <Link to="/" className={"navbar-brand"}>
        <img className="icon" src={fish} alt="fish" />
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
        <ul className={"navbar-nav mr-auto"}>{makeNavBar()}</ul>
      </div>
    </nav>
  );
}
