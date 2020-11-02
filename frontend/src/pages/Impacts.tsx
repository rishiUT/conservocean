import React, { Component, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

import Map from "../parts/Map";

import PPHM from "./Media/PlasticPollutionHeatMap.png";

interface impact {
  id?: string;
  name?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  date?: string;
  latitude?: string;
  longitude?: string;
  oil_amount?: string;
  count_density_1?: string;
  count_density_2?: string;
  count_density_3?: string;
  count_density_4?: string;
  plant_rating?: string;
  plant_location?: string;
  plant_water_source?: string;

  location?: string;
  capacity?: string;
  mapImgPath?: string;
}

const subcategories = [
  { value: "subcategory=plastic_pollition", label: "Plastic Pollution" },
  { value: "subcategory=coal_power_plants", label: "Coal Power Plants" },
  { value: "subcategory=offshore_oil_spills", label: "Offshore Oil Spills" },
  { value: "subcategory=tanker_oil_spills", label: "Tanker Oil Spills" },
];

const longitude = [
  { value: "long_min=0&long_max=89", label: "longitude = 0 - 89" },
  { value: "long_min=90&long_max=180", label: "longitude = 90 - 180" },
  { value: "long_min=-180&long_max=-91", label: "longitude = -180 - -91" },
  { value: "long_min=-90&long_max=-1", label: "longitude = -90 - -1" }
];

const latitude = [
  { value: "lat_min=-30&lat_max=-1", label: "latitude = -30 - -1" },
  { value: "lat_min=0&lat_max=29", label: "latitude = 0 - 29" },
  { value: "lat_min=30&lat_max=59", label: "latitude = 30 - 59" },
  { value: "lat_min=60&lat_max=90", label: "latitude = 60 - 90" }
];

const groupedFiltering = [
  { label: "SubCategories", options: subcategories },
  { label: "Longitude", options: longitude },
  { label: "Latitude", options: latitude },
];

// Display a table of all available impacts
class Impacts extends Component {
  state = {
    data: [],
    offset: 0,
    perPage: 9,
    numInstances: 500,
    currentFilter: ""
  };

  // Make API request for the current page of data using Axios
  loadData() {
    axios
      .get(`/api/human?offset=${this.state.offset}&limit=${this.state.perPage}&${this.state.currentFilter}`)
      .then((response) => {
        console.log(response);
        this.setState({
          // Update the data and number of instances
          data: response.data.data,
          numInstances: response.data.total_impact_count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Component initially loads
  componentDidMount() {
    this.loadData();
  }

  handlePageClick = (data: any) => {
    console.log(data);
    console.log(`Go to the selected page, page ${data.selected + 1}`);

    // Change Offset: offset = (page number) x (# per page)
    this.setState({ offset: data.selected * this.state.perPage }, () => {
      this.loadData();
    });
  };

  // Filter button handler that creates API path
  // Queries API for the filter's selections
  filter = () => {
    console.log("Filtering...");
    // Call API using currently applied filters
    this.loadData();
  }

  // Update the filter state when selections change
  handleFilterSelectChange = (selectedOptions: any) => {
    console.log("Updating Selected Filter State");
    console.log(selectedOptions);

    let filters: any[] = selectedOptions;
    let queryParams: string = "";

    if (filters) {
      filters.forEach(filter => {
        queryParams += filter.value;
      }); 
    }

    console.log(queryParams);
    this.setState({currentFilter: queryParams})
  }

  render() {
    return (
      <Switch>
        <Route exact path="/impacts">
          <div className="bg-light full-height">
            <div className="container">
              <h2 className="py-5 text-center">Human Impacts</h2>
              <Select
                closeMenuOnSelect={false}
                options={groupedFiltering}
                onChange={this.handleFilterSelectChange}
                isMulti
              />
            <button type="button" className="btn btn-primary" onClick={this.filter}>Filter</button>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Impact</th>
                      <th scope="col">Category</th>
                      <th scope="col">Type</th>
                      <th scope="col">Latitude</th>
                      <th scope="col">Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((impact: impact) => (
                      <ImpactTableData key={impact.id} impact={impact} />
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <nav>
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={this.state.numInstances / this.state.perPage}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    breakClassName={"break-me"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    activeLinkClassName={"page-link"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"disabled"}
                  />
                </nav>
              </div>
            </div>
          </div>
        </Route>
        <Route path={`/impacts/:id`} component={Impact} />
      </Switch>
    );
  }
}

function ImpactTableData({ impact }: any) {
  return (
    <tr>
      <th scope="row">
        <Link to={`/impacts/${impact.id}`} className="card-link">
          {impact.name ? impact.name : "Plastic Pollution Sample " + impact.id}
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
function Impact(props: any) {
  // Set initial state
  const initialImpactState: impact = {};
  let loading = false;

  // Getter and setter for impact state
  //impact is an impact, setImpact is a function you can use to change it
  const [impact, setImpact] = useState(initialImpactState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getImpact = async () => {
      const { data }: any = await axios(`/api/human/${props.match.params.id}`);
      setImpact(data.data);
      loading = true;
    };
    getImpact();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return impact ? (
    <div className="bg-light full-height">
      <main className="container py-5">
        <h1 className="text-center">{impact.name} </h1>
        <div className="container" style={{ width: "80%" }}>
          {impact.latitude && impact.longitude ? (
            <div style={{ width: "100%", height: "500px" }}>
              <Map
                lat={Number(impact.latitude)}
                lng={Number(impact.longitude)}
                zoom={4.75}
              />
            </div>
          ) : (
            <div />
          )}

          {impact.subcategory === "plastic_pollution" ? (
            <img src={PPHM} alt="Plastic Pollution Heat Map" />
          ) : null}

          <h3>Impact Details</h3>
          <ul>
            {impact.name ? <li>Name: {impact.name}</li> : null}
            {impact.category ? <li>Category: {impact.category}</li> : null}
            {impact.subcategory ? (
              <li>Subcategory: {impact.subcategory}</li>
            ) : null}
            {impact.description ? (
              <li>Description: {impact.description}</li>
            ) : null}
            {impact.date ? <li>Date: {impact.date}</li> : null}
            {impact.latitude ? <li>Latitude: {impact.latitude}</li> : null}
            {impact.longitude ? <li>Longitude : {impact.longitude}</li> : null}
            {impact.oil_amount ? (
              <li>Oil Spilled: {impact.oil_amount} gallons</li>
            ) : null}
            {impact.count_density_1 ? (
              <li>
                Num 0.33-1.00mm pieces of plastic per km^2:{" "}
                {impact.count_density_1}
              </li>
            ) : null}
            {impact.count_density_2 ? (
              <li>
                Num 1.01-4.75mm pieces of plastic per km^2:{" "}
                {impact.count_density_2}
              </li>
            ) : null}
            {impact.count_density_3 ? (
              <li>
                Num 4.76-200mm pieces of plastic per km^2:{" "}
                {impact.count_density_3}
              </li>
            ) : null}
            {impact.count_density_4 ? (
              <li>
                Num 200+mm pieces of plastic per km^2: {impact.count_density_4}
              </li>
            ) : null}
            {impact.plant_rating ? (
              <li>Plant Rating: {impact.plant_rating}</li>
            ) : null}
            {impact.plant_location ? (
              <li>Plant Location: {impact.plant_location}</li>
            ) : null}
            {impact.plant_water_source ? (
              <li>Plant Water Source: {impact.plant_water_source}</li>
            ) : null}
          </ul>
        </div>
      </main>
    </div>
  ) : (
    <div>Loading... </div>
  );
}

export default Impacts;
