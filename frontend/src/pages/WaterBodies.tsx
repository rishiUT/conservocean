import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function WaterBodies() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Water Body</h2>

      <ul>
        <li>
          <Link to={`${match.url}/waterbody-1`}>Water Body 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/waterbody-2`}>Water Body 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/waterbody-3`}>Water Body 3</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:waterbodyId`}>
          <WaterBody />
        </Route>
        <Route path={match.path}>
          <h3>Please select a body of water.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function WaterBody() {
  let { waterbodyId }: any = useParams();
  return <h3>Requested specie ID: {waterbodyId} </h3>;
}

export default WaterBodies;
