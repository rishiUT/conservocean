import React from "react";
import { useRouteMatch } from "react-router-dom";

function WBCard({ body }: any) {
    let match = useRouteMatch();
    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
          {/* Link card to instance page */}
          <a href={`${match.url}/${body.id}`} className="card-link">
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
            src={body.mapImgPath}
            width="100%"
            alt=""
          ></img>
          <div className="card-body">
            <h5 className="card-title">{body.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Latitude: {Number.parseFloat(body.latitude).toFixed(3)}</li>
            <li className="list-group-item">Longitude: {Number.parseFloat(body.longitude).toFixed(3)}</li>
            <li className="list-group-item">Size: {Number.parseFloat(body.size).toFixed(3)} sq. km</li>
            {body.water_temp ? <li className="list-group-item">Average Temperature: {body.water_temp}°C</li> : null}
            {body.wind_speedkmph ? <li className="list-group-item">Local Wind Speed: {body.wind_speedkmph} km/h</li> : null}
          </ul>
        </div>
      </div>
    );
  }  

export default WBCard;