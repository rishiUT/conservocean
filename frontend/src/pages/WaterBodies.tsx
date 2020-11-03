import React, { Component, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

import Map from "../parts/Map";

interface waterBody {
  id?: number;
  latitude?: string;
  longitude?: string;
  max_latitude?: string;
  max_longitude?: string;
  min_latitude?: string;
  min_longitude?: string;
  name?: string;
  salinity?: string;
  size?: number;
  type?: string;
  water_temp?: string;
}

const BODIES: waterBody[] = [];

// Filtering Categories

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

const temperature = [
  { value: "temp_min=0&temp_max=9", label: "0 - 9" },
  { value: "temp_min=10&temp_max=19", label: "10 - 19" },
  { value: "temp_min=20&temp_max=30", label: "20 - 30" },
];

const size = [
  { value: "size_min=1&size_max=999", label: "1 - 999" },
  { value: "size_min=1000&size_max=1999", label: "1000 - 1999" },
  { value: "size_min=2000&size_max=2999", label: "2000 - 2999" },
  { value: "size_min=3000&size_max=3999", label: "3000 - 3999" },
  { value: "size_min=4000&size_max=4999", label: "4000 - 4999" },
  { value: "size_min=5000&size_max=5999", label: "5000 - 5999" },
  { value: "size_min=6000&size_max=100000", label: "6000+" }
];

const type = [
  { value: "Bay", label: "Bay" },
  { value: "Coast", label: "Coast" },
  { value: "Delta", label: "Delta" },
  { value: "Escarpment", label: "Escarpment" },
  { value: "Fan", label: "Fan" },
  { value: "Lagoon", label: "Lagoon" },
  { value: "Lake", label: "Lake" },
  { value: "Large Marine Ecosystem", label: "Large Marine Ecosystem" },
  { value: "Reef", label: "Reef" },
  { value: "Shoal", label: "Shoal" },
];

const groupedFiltering = [
  { label: "Longitude", options: longitude },
  { label: "Latitude", options: latitude },
  { label: "Temperature (Celsius)", options: temperature },
  { label: "Size (Sq. Kilometers)", options: size },
  { label: "Type", options: type },
];

// Defines the categories and API calls for sorting
const groupedSorting = [
  { label: "Name", options: [{value: "sort=name", label: "A to Z"}, {value: "sort=name&ascending=false", label: "Z to A"}]},
  { label: "Longitude", options: [{value: "sort=longitude", label: "Ascending"}, {value: "sort=longitude&ascending=false", label: "Descending"}]},
  { label: "Latitude", options: [{value: "sort=latitude", label: "Ascending"}, {value: "sort=latitude&ascending=false", label: "Descending"}]},
  { label: "Temperature", options: [{value: "sort=water_temp", label: "Ascending"}, {value: "sort=water_temp&ascending=false", label: "Descending"}]},
  { label: "Size", options: [{value: "sort=size", label: "Ascending"}, {value: "sort=size&ascending=false", label: "Descending"}]},
];


// Display a grid of all bodies of water
class WaterBodies extends Component {
  state = {
    data: BODIES,
    offset: 0,
    perPage: 12,
    numInstances: 500,
    currentFilter: "",
    currentSort: ""
  };

  // Make API request for the current page of data using Axios
  loadData() {
    let URL = `/api/water?offset=${this.state.offset}&limit=${this.state.perPage}&${this.state.currentFilter}&${this.state.currentSort}`;
    axios
      .get(URL)
      .then((response) => {
        this.setState({
          // Update the data and number of instances
          data: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

      // Change the total number of pages based on total results
      URL = `/api/water?${this.state.currentFilter}`;
      axios
      .get(URL)
      .then((response) => {
        this.setState({
          // Update the number of instances
          numInstances: response.data.total_water_returned,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Load initial data after component added to document
  componentDidMount() {
    this.loadData();
  }

  // Go to the next page of data
  handlePageClick = (data: any) => {
    // Change Offset: offset = (page number) x (# per page)
    this.setState({ offset: data.selected * this.state.perPage }, () => {
      this.loadData();
    });
  };

  // Filter button handler that creates API path
  // Queries API for the filter's selections
  filter = () => {
    // Call API using currently applied filters
    this.loadData();
  }

  // Update the filter state when selections change
  handleFilterSelectChange = (selectedOptions: any) => {
    let filters: any[] = selectedOptions;
    let queryParams: string = "";

    if (filters) {
      filters.forEach(filter => {
        queryParams += filter.value;
      }); 
    }

    this.setState({currentFilter: queryParams})
  }

  handleSortSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      this.setState({currentSort: selectedOption.value});
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/water-bodies">
          <div className="bg-light full-height">
            <div className="container ">
              <h2 className="py-5 text-center">Bodies of Water</h2>
              <div style={{ zIndex: 100, position: "relative", width: "100%" }}>
                <Select
                  closeMenuOnSelect={false}
                  options={groupedFiltering}
                  onChange={this.handleFilterSelectChange}
                  isMulti
                />
                
                <button type="button" className="btn btn-primary" onClick={this.filter}>Filter</button>
                <Select
                options={groupedSorting}
                onChange={this.handleSortSelectChange}
              />

            <button type="button" className="btn btn-primary" onClick={this.filter}>Sort</button>

              </div>
              <div className="row">
                {this.state.data.map((body) => (
                  <WBCard key={body.name} body={body} />
                ))}
              </div>

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
                  containerClassName={"pagination justify-content-center"}
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
        </Route>
        <Route path={`/water-bodies/:id`} component={WaterBody} />
      </Switch>
    );
  }
}

function WBCard({ body }: any) {
  let match = useRouteMatch();
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
        {/* Link card to instance page */}
        <Link to={`${match.url}/${body.id}`} className="card-link">
          <span
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              zIndex: 1,
            }}
          ></span>
        </Link>

        <img
          className="card-image"
          src={body.mapImgPath}
          width="100%"
          alt=""
        ></img>
        <div className="card-body">
          <h5 className="card-title">{body.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Latitude: {Number.parseFloat(body.latitude).toFixed(3)}</li>
          <li className="list-group-item">Longitude: {Number.parseFloat(body.longitude).toFixed(3)}</li>
          <li className="list-group-item">Size: {Number.parseFloat(body.size).toFixed(3)} sq. km</li>
          {body.water_temp ? <li className="list-group-item">Average Temperature: {body.water_temp}°C</li> : null}
          {body.wind_speedkmph ? <li className="list-group-item">Local Wind Speed: {body.wind_speedkmph} km/h</li> : null}
        </ul>
      </div>
    </div>
  );
}

// Display data page on a particular body of water
function WaterBody(props: any) {
  // Set initial state
  const initialWaterState: waterBody = {};

  // Getter and setter for species state
  const [body, setWaterBody] = useState(initialWaterState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getWaterBody = async () => {
      // Pass param to the API call
      const { data }: any = await axios.get(`/api/water/${props.match.params.id}`);
      // Update state
      setWaterBody(data.data);
    };
    // Invoke the async function
    getWaterBody();

    // Let the linter know that there are no dependencies that will require 
    // calling this function again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return data
  return body ? (
    <div className="bg-light full-height">
      <main className="container py-5" style={{ height: "100%" }}>
        <h1 className="text-center">{body.name} </h1>
        <div className="container" style={{ width: "80%" }}>
          {body.latitude && body.longitude ? (
            <div style={{ width: "100%", height: "500px" }}>
              <Map
                lat={Number(body.latitude)}
                lng={Number(body.longitude)}
                zoom={4}
              />
            </div>
          ) : (
            <div></div>
          )}

          <h3>Region Data</h3>
          <ul>
            {body.name ? <li>Name: {body.name}</li> : null}
            {body.type ? <li>Type: {body.type}</li> : null}
            {body.latitude ? <li>Latitude: {body.latitude}</li> : null}
            {body.longitude ? <li>Longitude: {body.longitude}</li> : null}
            {body.water_temp ? (
              <li>Water Temperature: {body.water_temp}°C</li>
            ) : null}
            {body.salinity ? (
              <li>Salinity: {body.salinity} g salt per kg water</li>
            ) : null}
            {/* (fish: body.fish) => (
                      <li><Link to=`species/${fish.id}` className="card-link"> 
                          {fish.scientific_name}</Link><li>
                    ) */}
          </ul>
        </div>
      </main>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default WaterBodies;
