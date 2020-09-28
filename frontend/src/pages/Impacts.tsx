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

// Display a table of all available impacts
function Impacts() {
  let match = useRouteMatch();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/impacts">
          <div className="py-5 bg-light" style={{ height: "100%" }}>
            <div className="container">
              <h2 className="text-center">Human Impacts</h2>

              <table className="table">
                <thead>
                  <th scope="col">Impact</th>
                  <th scope="col">Attribute 2</th>
                  <th scope="col">Attribute 3</th>
                  <th scope="col">Attribute 4</th>
                  <th scope="col">Attribute 5</th>
                </thead>
                <tbody>
                  {IMPACTS.map((impact) => (
                    <ImpactTableData key={impact.name} impact={impact} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Route>
        <Route path={`${match.path}/:impactId`} children={<Impact />} />
      </Switch>
    </div>
  );
}

function ImpactTableData({ impact }: any) {
  let match = useRouteMatch();
  return (
    <tr>
      <th scope="row">
        <Link to={`${match.url}/${impact.name}`} className="card-link">
          {impact.name}
        </Link>
      </th>
      <td>Attribute 2</td>
      <td>Attribute 3</td>
      <td>Attribute 4</td>
      <td>Attribute 5</td>
    </tr>
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
