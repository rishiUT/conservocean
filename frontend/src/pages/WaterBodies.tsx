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
    name: "Atlantic",
    size: "big",
  },
  {
    name: "Pacific",
    size: "big",
  },
  {
    name: "Antarctic",
    size: "big",
  },
];

// Display a grid of all bodies of water
function WaterBodies() {
  let match = useRouteMatch();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/water-bodies">
          <div className="py-5 bg-light" style={{ height: "100%" }}>
            <div className="container">
              <h2 className="text-center">Bodies of Water</h2>
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
      <Link to={`${match.url}/${body.name}`} className="card-link">
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
      <svg
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
      </svg>
      <div className="card-body">
        <h5 className="card-title">{body.name}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Attribute 1</li>
        <li className="list-group-item">Attribute 2</li>
        <li className="list-group-item">Attribute 3</li>
        <li className="list-group-item">Attribute 4</li>
      </ul>
    </div>
  );
}

// Display data page on a particular body of water
function WaterBody() {
  let { waterbodyId }: any = useParams();
  let body = BODIES.find((body) => body.name === waterbodyId);
  if (body) {
    return (
      <h3>
        Requested water body ID: {body.name} {body.size}
      </h3>
    );
  }
  return <h3>Body not found</h3>;
}

export default WaterBodies;
