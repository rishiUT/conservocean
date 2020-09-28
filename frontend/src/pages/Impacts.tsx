import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function Impacts() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Impacts</h2>

      <ul>
        <li>
          <Link to={`${match.url}/impact-1`}>Impact 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/impact-2`}>Impact 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/impact-3`}>Impact 3</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:impactId`}>
          <Impact />
        </Route>
        <Route path={match.path}>
          <h3>Please select an impact.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Impact() {
  let { impactId }: any = useParams();
  return <h3>Requested impact ID: {impactId} </h3>;
}

export default Impacts;
