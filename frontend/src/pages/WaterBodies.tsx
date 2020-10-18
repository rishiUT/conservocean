import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import atlantic from "../assets/atlantic.png";
import southern from "../assets/southern.png";
import ashmore from "../assets/ashmore.png";

interface waterBody {
  id?: number,
  latitude?: string,
  longitude?: string,
  max_latitude?: string,
  max_longitude?: string,
  min_latitude?: string,
  min_longitude?: string,
  name?: string,
  salinity?: string,
  size?: number,
  type?: string,
  water_temp?: string
}

const BODIES: waterBody[] = [
  {
    name: "Atlantic Ocean",
    latitude: `4° 18' 42.5" N`,
    longitude: `31° 30' 14.5" W`,
    salinity: "35.17",
    // seaLevel: "0.2",
    water_temp: "27.84",
    // mapImgPath: atlantic,
    // chlorophyll: "0.11",
    // iron: "0.0",
    // nitrate: "0.01",
    // oxygen: "201.97",
    // ph: "8.04",
    // phosphate: "0.05",
    // phyto: "4.6",
    // phytoplankton: "1.45",
    // silicate: "2.25",
  },
  {
    name: "Southern Ocean",
    latitude: `68° 2' 23.3" S`,
    longitude: `26° 37' 58.3" W`,
    salinity: "34.45",
    // seaLevel: "-1.89",
    water_temp: "-18.43",
    // mapImgPath: southern,
    // chlorophyll: "0.03",
    // iron: "0.0",
    // nitrate: "29.31",
    // oxygen: "324.73",
    // ph: "8.03",
    // phosphate: "2.07",
    // phyto: "0.0",
    // phytoplankton: "0.08",
    // silicate: "73.89",
  },
  {
    name: "Ashmore Reef",
    latitude: `12° 14' 30.3" S`,
    longitude: `123° 2' 30" E`,
    salinity: "34.76",
    // seaLevel: "0.62",
    water_temp: "29.12",
    // mapImgPath: ashmore,
    // chlorophyll: "0.14",
    // iron: "0.0",
    // nitrate: "0.0",
    // oxygen: "203.65",
    // ph: "8.01",
    // phosphate: "0.15",
    // phyto: "4.21",
    // phytoplankton: "1.86",
    // silicate: "2.27",
  },
];

// Display a grid of all bodies of water
function WaterBodies() {
  let match = useRouteMatch();

  return (
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
      <img className="card-image" src={body.mapImgPath} width="100%"></img>
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
          Temperature {body.water_temp}°C
        </li>
      </ul>
    </div>
  );
}

// Display data page on a particular body of water
function WaterBody() {
  let { waterbodyId }: any = useParams();
  let body = BODIES.find(
    (body) => body.name === waterbodyId.replaceAll("-", " ")
  );
  if (body) {
    return (
      <div className="bg-light">
        <main className="container py-5" style={{ height: "100%" }}>
          <h1 className="text-center">{body.name} </h1>
          <div className="container" style={{ width: "80%" }}>
            
            {/* Insert map here */}

            <h3>Region Data</h3>
            <ul>
              {body.name ? <li>Name: {body.name}</li> : null}
              {body.type ? <li>Type: {body.type}</li> : null}
              {body.latitude ? <li>Latitude: {body.latitude}</li> : null}
              {body.longitude ? <li>Longitude: {body.longitude}</li> : null}
              {body.water_temp ? <li>Water Temperature: {body.water_temp}°C</li> : null}
              {body.salinity ? <li>Salinity: {body.salinity} g salt per kg water</li> : null}
            </ul>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="py-5 container">
      <h3 className="text-center">Ocean region not found.</h3>
    </div>
  );
}

export default WaterBodies;
