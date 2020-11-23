import React from "react";
import "../About/About.css";
import fish from "../Media/fish.png";
import Error404 from "./Error404";

function ErrorPage(props: any) {
  if (props.errorid === 404) {
    return Error404;
  }
  return (
    <div>
      <img src={fish} alt="Conservocean Logo "></img>
      <h2>Error {props.errorid ? props.errorid : -1}</h2>
      <h3>Something went wrong. Sorry about that!</h3>
      <button onClick={window.location.reload}>
        If you'd like to try again, click here!
      </button>
      <a href="https://conservocean.me" className="button">
        If you'd like to try something else, click here!
      </a>
    </div>
  );
}

export default ErrorPage;
