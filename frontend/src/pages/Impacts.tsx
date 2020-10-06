import { mainModule } from "process";
import React, { Component } from "react";
import Pagination from "react-js-pagination";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import maine from "../assets/maine.png";
import persianGulf from "../assets/persian-gulf.png";
import taeanKorea from "../assets/taean-korea.png"

const IMPACTS = [
  {
    name: "Maine Independence Station Gas Plant ME USA",
    category: "power plant",
    subcategory: "GAS",
    description: "Environmentally Responsible",
    latitude: "44.8236",
    longitude: "-68.7106",
    location: "United States of America",
    capacity: "550.2",
    date: "Present",
    mapImgPath: maine,
  },
  {
    name: "Arabian Gulf Spills",
    category: "spill",
    subcategory: "Oil",
    description:
      "During the 1991 Gulf War, tankers and oil terminals in Kuwait were destroyed, causing the release of an estimated 6-8 million barrels (252 - 336 million gallons) of oil into the waters of the Arabian (Persian) Gulf. Many oil wells in Kuwait were destroyed and set on fire, resulting in the release of much greater amounts of oil and combustion products to land, air, and water in Kuwait.",
    latitude: "29.5",
    longitude: "48",
    location: "Persian Gulf, Kuwait",
    capacity: "336000009",
    date: "1/19/91",
    mapImgPath: persianGulf,
  },
  {
    name: "Heibei Spirit Oil Spill",
    category: "spill",
    subcategory: "Oil",
    description: "On 7th December 2007, the HEBEI SPIRIT Ship was struck by a crane barge whilst at anchor off Taean, South Korea. The barge broke free from its tow in poor weather, puncturing three port-side cargo tanks. Despite mitigating efforts by the crew of HEBEI SPIRIT, approximately 10,900 tonnes of Iranian Heavy, Upper Zakum and Kuwait Export crude oils were released to the sea.",
    latitude: "36.893",
    longitude: "126.055",
    location: "Taean, South Korea",
    capacity: "109000",
    date: "12/7/2007",
    mapImgPath: taeanKorea,
  },
];

class pages extends Component {
  constructor(props : any) {
    super(props);
    this.state = {
      activePage : 1
    };
  }

  handlePageChange(pageNumber : number) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
 
  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={20}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

// Display a table of all available impacts
function Impacts() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/impacts">
        <div className="bg-light" style={{ height: "100%" }}>
          <div className="container">
            <h2 className="py-5 text-center">Human Impacts</h2>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <th scope="col">Impact</th>
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
  let impact = IMPACTS.find(
    (impact) => impact.name === impactId.replaceAll("-", " ")
  );
  if (impact) {
    return (
      <div className="bg-light">
        <main className="container py-5">
          <h1 className="text-center">{impact.name} </h1>
          <div className="container" style={{ width: "80%" }}>
            <div className="text-center py-3">
              <img
                style={{ borderRadius: "5px" }}
                src={impact.mapImgPath}
                width="100%"
              ></img>
            </div>
            <h3>Impact Details</h3>
            <ul>
              <li>Latitude: {impact.latitude}</li>
              <li>Longitude: {impact.longitude}</li>
              <li>Location: {impact.location}</li>
              <li>Date: {impact.date}</li>
              <li>
                {impact.category === "power plant"
                  ? "Environmental Rating: "
                  : "Description: "}
                {impact.description}
              </li>
              <li>Category: {impact.category?.toLowerCase()}</li>
              <li>Type: {impact.subcategory?.toLowerCase()}</li>
              <li>
                {impact.category === "power plant" ? "Capacity: " : "Volume: "}
                {impact.capacity?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {impact.category === "power plant" ? " MW" : " gallons"}
              </li>
            </ul>
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="py-5 container">
      <h3 className="text-center">Impact not found.</h3>
    </div>
  );
}

export default Impacts;
