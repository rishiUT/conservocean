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
    name: "Maine Independence Station Gas Plant ME USA",
    category: "power plant",
    subcategory: "GAS",
    environmentRating: "Environmentally Responsible",
    latitude: "-68.7106",
    longitude: "44.8236",
    country: "United States of America",
    capacity: "550.2",
  },
  {
    name: "fishery",
  },
  {
    name: "hurricane",
  },
];

// Display a table of all available impacts
function Impacts() {
  let match = useRouteMatch();

  return (
    <div style={{ height: "100%" }}>
      <Switch>
        <Route exact path="/impacts">
          <div className="bg-light" style={{ height: "100%" }}>
            <div className="container">
              <h2 className="py-5 text-center">Human Impacts</h2>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <th scope="col">Impact Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                  </thead>
                  <tbody>
                    {IMPACTS.map((impact) => (
                      <ImpactTableData key={impact.name} impact={impact} />
                    ))}
                  </tbody>
                </table>
              </div>
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
        <Link
          to={`${match.url}/${impact.name.replaceAll(" ", "-")}`}
          className="card-link"
        >
          {impact.name}
        </Link>
      </th>
      <td>{impact.category}</td>
      <td>{impact.subcategory?.toLowerCase()}</td>
      <td>{impact.latitude}</td>
      <td>{impact.longitude}</td>
    </tr>
  );
}

// Display an information page for a specific impact
function Impact() {
  let { impactId }: any = useParams();
  let impact = IMPACTS.find((impact) => impact.name === impactId);
  if (impact) {
    return <h3>Requested impact ID: {impact.name}</h3>;
  }
  return <h3>Impact not found</h3>;
}

export default Impacts;
