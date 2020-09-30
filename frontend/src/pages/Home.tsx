import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import waves from "./Media/waves.png";
import fish from "./Media/fish.png";
import drops from "./Media/water-drops.png";

// function Home() {
//   return (<h2>Conservocean is an educational tool with the mission to bring awareness to how human avtivity impacts bodies of water and aquatic animals. </h2>);
// }

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

        <div className="list-cont">
          <ul className="list">
            <li className="list-item">
              <Link to="/water-bodies" className="button">
                Bodies of Water
              </Link>
            </li>
            <li className="list-item">
              <Link to="/species" className="button">
                Aquatic Animals
              </Link>
            </li>
            <li className="list-item">
              <Link to="/impacts" className="button">
                Human Impacts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
