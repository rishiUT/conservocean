import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import {
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import maine from "../assets/maine.png";
import persianGulf from "../assets/persian-gulf.png";
import taeanKorea from "../assets/taean-korea.png";
import axios from "axios";

interface impact {
  name?: string
  category?: string
  subcategory?: string
  description?: string
  date?: string
  latitude?: string
  longitude?: string
  oil_amount?: string
  count_density_1?: string
  count_density_2?: string
  count_density_3?: string
  count_density_4?: string
  plant_rating?: string
  plant_location?: string
  plant_water_source?: string

  location?: string
  capacity?: string
  mapImgPath?: string
}

const IMPACTS: impact[] = [
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
    description:
      "On 7th December 2007, the HEBEI SPIRIT Ship was struck by a crane barge whilst at anchor off Taean, South Korea. The barge broke free from its tow in poor weather, puncturing three port-side cargo tanks. Despite mitigating efforts by the crew of HEBEI SPIRIT, approximately 10,900 tonnes of Iranian Heavy, Upper Zakum and Kuwait Export crude oils were released to the sea.",
    latitude: "36.893",
    longitude: "126.055",
    location: "Taean, South Korea",
    capacity: "109000",
    date: "12/7/2007",
    mapImgPath: taeanKorea,
  },
  {
    name: "Maine Independence Station Gas Plant ME USA (no lat)",
    category: "power plant",
    subcategory: "GAS",
    description: "Environmentally Responsible",
    longitude: "-68.7106",
    location: "United States of America",
    capacity: "550.2",
    date: "Present",
    mapImgPath: maine,
  },
];

// Display a table of all available impacts
class Impacts extends Component {
  state = {
    data: IMPACTS,
    offset: 0,
    perPage: 20,
    numInstances: 500,
  };

  loadData() {
    // Axios API request
    // axios.get(`https://api.conservocean.me/api/impacts?offset={this.state.offset}&limit={this.state.perPage}`)
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => {
        console.log(response);
        this.setState({
          // Update the data and number of instances
          data: this.state.data.concat(IMPACTS),
          // data: response.data.impacts,
          numInstances: this.state.numInstances,
          // numInstances: response.data.numInstances,
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  // Component initially loads
  componentDidMount() {
    this.loadData();
  }

  handlePageClick = (data: any) => {
    console.log(data);
    console.log(`Go to the selected page, page ${data.selected + 1}`)

    // Change Offset: offset = (page number) x (# per page)
    this.setState({ offset: data.selected * this.state.perPage }, () => {
      this.loadData();
    });
  }

  render() {
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
                    {this.state.data.map((impact) => (
                      <ImpactTableData key={impact.name} impact={impact} />
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <nav>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={this.state.numInstances / this.state.perPage}
                    marginPagesDisplayed={1} 
                    pageRangeDisplayed={3} 
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    breakClassName={'break-me'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                    activeLinkClassName={'page-link'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    disabledClassName={'disabled'}
                  />
                </nav>
              </div>
            </div>
          </div>
        </Route>
        <Route path={`/impacts/:impactId`} children={<Impact />} />
      </Switch>
    );
  }
}

function ImpactTableData({ impact }: any) {
  return (
    <tr>
      <th scope="row">
        <Link
          to={`/impacts/${impact.name.replaceAll(" ", "-")}`}
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

            {/* Display map here. */}

            <h3>Impact Details</h3>
            <ul>
              {impact.name ? <li>Name: {impact.name}</li> : null}
              {impact.category ? <li>Category: {impact.category}</li> : null}
              {impact.subcategory ? <li>Subcategory: {impact.subcategory}</li> : null}
              {impact.description ? <li>Description: {impact.description}</li> : null}
              {impact.date ? <li>Date: {impact.date}</li> : null}
              {impact.latitude ? <li>Latitude: {impact.latitude}</li> : null}
              {impact.longitude ? <li>Longitude: {impact.longitude}</li> : null}
              {impact.oil_amount ? <li>Oil Spilled: {impact.oil_amount} gallons</li> : null}
              {impact.count_density_1 ? <li>Num 0.33-1.00mm pieces of plastic per km^2: {impact.count_density_1}</li> : null}
              {impact.count_density_2 ? <li>Num 1.01-4.75mm pieces of plastic per km^2: {impact.count_density_2}</li> : null}
              {impact.count_density_3 ? <li>Num 4.76-200mm pieces of plastic per km^2: {impact.count_density_3}</li> : null}
              {impact.count_density_4 ? <li>Num 200+mm pieces of plastic per km^2: {impact.count_density_4}</li> : null}
              {impact.plant_rating ? <li>Plant Rating: {impact.plant_rating}</li> : null}
              {impact.plant_location ? <li>Plant Location: {impact.plant_location}</li> : null}
              {impact.plant_water_source ? <li>Plant Water Source: {impact.plant_water_source}</li> : null}
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
