import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const IMPACTS = [
  {
    name: "oil",
    size: "big",
  },
  {
    name: "fishery",
    size: "big",
  },
  {
    name: "hurricane",
    size: "big",
  },
];

// Display a grid of all available impacts
function Impacts() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path="/impacts">
          <div>
            <h2>Impacts</h2>
            <ul>
              {IMPACTS.map((impact) => (
                <li key={impact.name}>
                  <Link to={`${match.url}/${impact.name}`}>{impact.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Route>
        <Route path={`${match.path}/:impactId`} children={<Impact />} />
      </Switch>
    </div>
  );
}

// Display an information page for a specific impact
function Impact() {
  let { impactId }: any = useParams();
  let impact = IMPACTS.find((impact) => impact.name === impactId);
  if (impact) {
    return (
      <h3>
        Requested impact ID: {impact.name} {impact.size}
      </h3>
    );
  }
  return <h3>Impact not found</h3>;
}

export default Impacts;
