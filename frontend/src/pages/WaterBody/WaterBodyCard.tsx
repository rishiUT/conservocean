import React from "react";
import { roundFloat } from "../../util/format";

// prints information about a given water body in a card
function WBCard(props: any) {
  return (
    <div className={`col-lg-4 col-md-6 col-sm-12 ${props.className}`}>
      <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
        {/* Link card to instance page */}
        <a href={`water-bodies/${props.body.id}`} className="card-link">
          <span
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              zIndex: 1,
            }}
          ></span>
        </a>

        <img
          className="card-image"
          src={props.body.imageurl}
          width="100%"
          alt=""
        ></img>

        <div className="card-body">
          <h5 className="card-title">
            <span dangerouslySetInnerHTML={{ __html: props.body.name }}></span>
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Latitude: {roundFloat(props.body.latitude, 3)}
          </li>
          <li className="list-group-item">
            Longitude: {roundFloat(props.body.longitude, 3)}
          </li>
          <li className="list-group-item">
            Size: {roundFloat(props.body.size, 3)} sq. km
          </li>
          {props.body.water_temp ? (
            <li className="list-group-item">
              Average Temperature: {props.body.water_temp}°C
            </li>
          ) : null}
          {props.body.wind_speedkmph ? (
            <li className="list-group-item">
              Local Wind Speed: {props.body.wind_speedkmph} km/h
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default WBCard;
