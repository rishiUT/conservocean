import React from "react";
import "../About/About.css";
import fish from "../Media/fish.png";

function Error404() {
  return (
    <div>
      <img src={fish} alt="Conservocean Logo "></img>
      <h2>Error 404: Not Found</h2>
      <h3>
        We couldn't find the page you were looking for. Don't worry too much;
        there are other fish in the sea!
      </h3>
      <a href="https://conservocean.me" className="button">
        Click here to learn more about them!
      </a>
    </div>
  );
}

export default Error404;
