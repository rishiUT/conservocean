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
  { value: "0", label: "longitude = 0 - 59" },
  { value: "60", label: "longitude = 60 - 119" },
  { value: "120", label: "longitude =  120 - 179" },
  { value: "180", label: "longitude = 180 - 239" },
  { value: "240", label: "longitude = 240 - 299" },
  { value: "300", label: "longitude = 300 - 359" },
];

const latitude = [
  { value: "0", label: "latitude = 0 - 59" },
  { value: "60", label: "latitude = 60 - 119" },
  { value: "120", label: "latitude =  120 - 179" },
  { value: "180", label: "latitude = 180 - 239" },
  { value: "240", label: "latitude = 240 - 299" },
  { value: "300", label: "latitude = 300 - 359" },
];

const temperature = [
  { value: "0", label: "0 - 9" },
  { value: "10", label: "10 - 19" },
  { value: "20", label: "20 - 30" },
];

const size = [
  { value: "1", label: "1 - 999" },
  { value: "1000", label: "1000 - 1999" },
  { value: "2000", label: "2000 - 2999" },
  { value: "3000", label: "3000 - 3999" },
  { value: "4000", label: "4000 - 4999" },
  { value: "5000", label: "5000 - 5999" },
  { value: "6000", label: "6000+" },
  { value: "null", label: "Unknown" },
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

// Display a grid of all bodies of water
class WaterBodies extends Component {
  state = {
    data: BODIES,
    offset: 0,
    perPage: 12,
    numInstances: 500,
  };

  // Make API request for the current page of data using Axios
  loadData() {
    const URL = `/api/water?offset=${this.state.offset}&limit=${this.state.perPage}`;
    axios
      .get(URL)
      .then((response) => {
        this.setState({
          // Update the data and number of instances
          data: response.data.data,
          numInstances: response.data.total_water_count,
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
    console.log(`Go to the selected page, page ${data.selected + 1}`);

    // Change Offset: offset = (page number) x (# per page)
    this.setState({ offset: data.selected * this.state.perPage }, () => {
      this.loadData();
    });
  };

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
                  isMulti
                />
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
          <li className="list-group-item">Latitude: {body.latitude}</li>
          <li className="list-group-item">Longitude: {body.longitude}</li>
          <li className="list-group-item">Size: {body.size} miles</li>
          <li className="list-group-item">Tide Height: {body.tide_height}</li>
          <li className="list-group-item">Temperature {body.water_temp}°C</li>
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
      const { data }: any = await axios(`/api/water/${props.match.params.id}`);
      // Update state
      console.log(data);
      setWaterBody(data.data);
    };
    // Invoke the async function
    getWaterBody();
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
