import React from "react";
import './Home.css';
import { Link } from "react-router-dom";


// function Home() {
//   return (<h2>Conservocean is an educational tool with the mission to bring awareness to how human avtivity impacts bodies of water and aquatic animals. </h2>);
// }

function Home() {
  return (
    <div>
      <h2 className="heading">Welcome!</h2>
      <h2 className="subheading">Conservocean is an educational tool with the mission to bring awareness to how human activity impacts bodies of water and aquatic animals. </h2>
      <ul className="list">
        <li className="list-item">
            <Link to="/bodies" className={"nav-link"}>
                Bodies of Water
            </Link>
          
        </li>
        <li className="list-item">
          Aquatic Animals
          </li>
        <li className="list-item">
          Human Impacts
          </li>
      </ul>
    </div>
  );
}

export default Home;
