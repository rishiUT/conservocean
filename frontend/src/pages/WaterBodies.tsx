import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const BODIES = [
  {
    name: "Atlantic Ocean",
    latitude: `4° 18' 42.5" N`,
    longitude: `31° 30' 14.5" W`,
    salinity: "35.17",
    seaLevel: "0.2",
    waterTemperature: "27.84",
  },
  {
    name: "Southern Ocean",
    latitude: `68° 2' 23.3" S`,
    longitude: `26° 37' 58.3" W`,
    salinity: "34.45",
    seaLevel: "-1.89",
    waterTemperature: "-18.43",
  },
  {
    name: "Ashmore Reef",
    latitude: `-12.24174549`,
    longitude: `123.04165997`,
    salinity: "34.76",
    seaLevel: "0.62",
    waterTemperature: "29.12",
  },
];

// Display a grid of all bodies of water
function WaterBodies() {
  let match = useRouteMatch();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/water-bodies">
          <div className="bg-light" style={{ height: "100%" }}>
            <div className="container">
              <h2 className="py-5 text-center">Bodies of Water</h2>
              <div className="card-deck">
                {BODIES.map((body) => (
                  <WBCard key={body.name} body={body} />
                ))}
              </div>
            </div>
          </div>
        </Route>
        <Route path={`${match.path}/:waterbodyId`} children={<WaterBody />} />
      </Switch>
    </div>
  );
}

function WBCard({ body }: any) {
  let match = useRouteMatch();
  return (
    <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
      <Link
        to={`${match.url}/${body.name.replace(" ", "-")}`}
        className="card-link"
      >
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
      </Link>
      {/* <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: Thumbnail"
      >
        <title>Placeholder</title>
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">
          Thumbnail
        </text>
      </svg> */}
      <div className="card-body">
        <h5 className="card-title">{body.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Latitude: {body.latitude}</li>
        <li className="list-group-item">Longitude: {body.longitude}</li>
        <li className="list-group-item">
          Salinity: {body.salinity} g salt per kg water
        </li>
        <li className="list-group-item">
          Temperature {body.waterTemperature}°C
        </li>
      </ul>
    </div>
  );
}

// Display data page on a particular body of water
function WaterBody() {
  let { waterbodyId }: any = useParams();
  let body = BODIES.find((body) => body.name === waterbodyId);
  if (body) {
    return <h3>Requested water body ID: {body.name}</h3>;
  }
  return <h3>Body not found</h3>;
}

export default WaterBodies;
