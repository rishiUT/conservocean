import React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import waves from './Media/waves.png';
import fish from './Media/fish.png';


// function Home() {
//   return (<h2>Conservocean is an educational tool with the mission to bring awareness to how human avtivity impacts bodies of water and aquatic animals. </h2>);
// }

function Home() {
  return (
    <div>

      <div className="hero-section">
        <div className="heading-content">
          <div className="img-cont">
            <img className="image-1" src={fish} alt="fish"/>
          </div>
          <h2 className="heading">Welcome!</h2>
          <h2 className="subheading">Conservocean is an educational tool with the mission to bring awareness to how human activity impacts bodies of water and aquatic animals. </h2>
        </div>
        <div className="img-cont">
          <img className="image" src={waves} alt="waves"/>
        </div>
      </div>

      <div className="menu-section">
        <ul className="list">
          <li className="list-item">
              <Link to="/water-bodies" className={"nav-link"}>
                  Bodies of Water
              </Link>
          </li>
          <li className="list-item">
              <Link to="/species" className={"nav-link"}>
                  Aquatic Animals
              </Link>
          </li>
          <li className="list-item">
              <Link to="/impacts" className={"nav-link"}>
                  Human Impacts
              </Link>
          </li>
      </ul>
    </div>
    </div>
  );
}

export default Home;
