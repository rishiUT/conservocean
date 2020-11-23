import React from "react";
import "./Home.css";
import waves from "../Media/waves.png";
import fish from "../Media/fish.png";
import drops from "../Media/water-drops.png";
import fish2 from "../Media/fish.svg";
import water from "../Media/sea.svg";
import factory from "../Media/factory.svg";
import Hit from "./HomeSearch";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";

// Keys to access Alggolia search
const searchClient = algoliasearch(
  "VEMEIF8QHL",
  "e211f5541054cdb5177282492d4a90c8"
);

// Returns mark-up for the home page
function Home() {
  const buttons = [
    { link: "/species", text: "\nAquatic Animals", img: fish2, alt: "fish" },
    {
      link: "/water-bodies",
      text: "\nBodies of Water",
      img: water,
      alt: "water",
    },
    { link: "/impacts", text: "\nHuman Impacts", img: factory, alt: "factory" },
  ];

  function makeButtons() {
    return buttons.map((button) => (
      <li key={button.text} className="list-item">
        <a href={button.link} className="button">
          <img className="image-2" src={button.img} alt={button.alt} />
          {button.text}
        </a>
      </li>
    ));
  }

  return (
    <div>
      <div className="hero-section">
        <div className="heading-content">
          <div className="img-cont">
            <img className="image-1" src={fish} alt="fish" />
          </div>
          <h2 className="heading">Welcome!</h2>
          <h2 className="subheading">
            ConservOcean is an educational tool with the mission to bring
            awareness to how human activity impacts bodies of water and aquatic
            animals.{" "}
          </h2>
        </div>
        <div className="img-cont">
          <img className="image" src={waves} alt="waves" />
        </div>
      </div>

      <div className="menu-section">
        <div className="text-content">
          <div className="img-cont">
            <img className="image-1" src={drops} alt="drops" />
          </div>
          <h2 className="heading">
            Water covers over 70% of Earth's surface.{" "}
          </h2>
          <h2 className="subheading">
            Explore Earth's oceans, marine life, and the impact of human factors
          </h2>
        </div>

        {/* These are links to the model pages. */}
        <div className="list-cont">
          <ul className="list">{makeButtons()}</ul>
        </div>
      </div>

      {/* This allows users to search the entire site. */}
      <div className="search-section bg-light">
        <div className="container">
          <h2 className="heading">Get started by searching.</h2>
        </div>
        <InstantSearch searchClient={searchClient} indexName="conservocean">
          <div>
            <div className="container">
              <SearchBox />
            </div>
            <div className="row-cont">
              <Hits hitComponent={Hit} />
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default Home;
