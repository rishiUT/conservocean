import React from "react";
import "../About/About.css";
import fish from "../Media/fish.png";

function NoResponseError() {
  return (
    <div>
      <img src={fish} alt="Conservocean Logo "></img>
      <h2>Timeout Error</h2>
      <h3>The page you wanted didn't load. Would you like to try again?</h3>
      <a href="https://conservocean.me" className="button">
        Yes
      </a>
      <a href="https://conservocean.me" className="button">
        No
      </a>
    </div>
  );
}

export default NoResponseError;
