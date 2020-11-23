import React from "react";
import "../About/About.css";
import fish from "../Media/fish.png";

function MysteryError() {
  return (
    <div>
      <img src={fish} alt="Conservocean Logo "></img>
      <h2>Well, this is awkward</h2>
      <h3>Something went wrong, and we don't know what it is.</h3>
      <a href="https://conservocean.me" className="button">
        Click here to go back to the homepage!
      </a>
    </div>
  );
}

export default MysteryError;
