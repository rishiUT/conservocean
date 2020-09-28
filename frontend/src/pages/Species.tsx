import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

const SPECIES = [
  {
    name: "fish",
    size: "big",
  },
  {
    name: "shark",
    size: "big",
  },
  {
    name: "squid",
    size: "big",
  },
];

// Display a grid of all available species
function Species() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path="/species">
          <div>
            <h2>Species</h2>
            <ul>
              {SPECIES.map((specie) => (
                <li key={specie.name}>
                  <Link to={`${match.url}/${specie.name}`}>{specie.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Route>
        <Route path={`${match.path}/:specieId`} children={<Specie />} />
      </Switch>
    </div>
  );
}

// Display content for an individual species page
function Specie() {
  let { specieId }: any = useParams();
  let specie = SPECIES.find((specie) => specie.name === specieId);
  if (specie) {
    return (
      <h3>
        Requested species ID: {specie.name} {specie.size}
      </h3>
    );
  }
  return <h3>Species not found</h3>;
}

export default Species;
