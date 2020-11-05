import React from "react";

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
          src={props.body.mapImgPath}
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
            Latitude: {Number.parseFloat(props.body.latitude).toFixed(3)}
          </li>
          <li className="list-group-item">
            Longitude: {Number.parseFloat(props.body.longitude).toFixed(3)}
          </li>
          <li className="list-group-item">
            Size: {Number.parseFloat(props.body.size).toFixed(3)} sq. km
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
