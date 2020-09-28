import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

function Species() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Species</h2>

      <ul>
        <li>
          <Link to={`${match.url}/species-1`}>Species 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/species-2`}>Species 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/species-3`}>Species 3</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:specieId`}>
          <Specie />
        </Route>
        <Route path={match.path}>
          <h3>Please select a species.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Specie() {
  let { specieId }: any = useParams();
  return <h3>Requested specie ID: {specieId} </h3>;
}

export default Species;
