import React from "react";
import "./Home.css";
import waves from "../Media/waves.png";
import fish from "../Media/fish.png";
import drops from "../Media/water-drops.png";
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
          <ul className="list">
            <li className="list-item">
              <a href="/water-bodies" className="button">
                Bodies of Water
              </a>
            </li>
            <li className="list-item">
              <a href="/species" className="button">
                Aquatic Animals
              </a>
            </li>
            <li className="list-item">
              <a href="/impacts" className="button">
                Human Impacts
              </a>
            </li>
          </ul>
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
