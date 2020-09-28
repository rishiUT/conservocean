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
    name: "atlantic",
    size: "big",
  },
  {
    name: "pacific",
    size: "big",
  },
  {
    name: "antarctic",
    size: "big",
  },
];

// Display a table of all bodies of water
function WaterBodies() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path="/water-bodies">
          <div>
            <h2>Water Body</h2>
            <ul>
              {BODIES.map((body) => (
                <li key={body.name}>
                  <Link to={`${match.url}/${body.name}`}>{body.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Route>
        <Route path={`${match.path}/:waterbodyId`} children={<WaterBody />} />
      </Switch>
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
