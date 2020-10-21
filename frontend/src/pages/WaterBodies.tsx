import React, { Component, useState, useEffect }  from "react";
import ReactPaginate from "react-paginate";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import axios from "axios";
// import atlantic from "../assets/atlantic.png";
// import southern from "../assets/southern.png";
// import ashmore from "../assets/ashmore.png";

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
// const BODIES: waterBody[] = [
//   {
//     name: "Atlantic Ocean",
//     latitude: `4.31167`,
//     longitude: `-31.504167`,
//     salinity: "35.17",
//     // seaLevel: "0.2",
//     water_temp: "27.84",
//     // mapImgPath: atlantic,
//     // chlorophyll: "0.11",
//     // iron: "0.0",
//     // nitrate: "0.01",
//     // oxygen: "201.97",
//     // ph: "8.04",
//     // phosphate: "0.05",
//     // phyto: "4.6",
//     // phytoplankton: "1.45",
//     // silicate: "2.25",
//   },
//   // {
//   //   name: "Southern Ocean",
//   //   latitude: `68° 2' 23.3" S`,
//   //   longitude: `26° 37' 58.3" W`,
//   //   salinity: "34.45",
//   //   // seaLevel: "-1.89",
//   //   water_temp: "-18.43",
//   //   // mapImgPath: southern,
//   //   // chlorophyll: "0.03",
//   //   // iron: "0.0",
//   //   // nitrate: "29.31",
//   //   // oxygen: "324.73",
//   //   // ph: "8.03",
//   //   // phosphate: "2.07",
//   //   // phyto: "0.0",
//   //   // phytoplankton: "0.08",
//   //   // silicate: "73.89",
//   // },
//   // {
//   //   name: "Ashmore Reef",
//   //   latitude: `12° 14' 30.3" S`,
//   //   longitude: `123° 2' 30" E`,
//   //   salinity: "34.76",
//   //   // seaLevel: "0.62",
//   //   water_temp: "29.12",
//   //   // mapImgPath: ashmore,
//   //   // chlorophyll: "0.14",
//   //   // iron: "0.0",
//   //   // nitrate: "0.0",
//   //   // oxygen: "203.65",
//   //   // ph: "8.01",
//   //   // phosphate: "0.15",
//   //   // phyto: "4.21",
//   //   // phytoplankton: "1.86",
//   //   // silicate: "2.27",
//   // },
// ];

// Display a grid of all bodies of water
class WaterBodies extends Component {
  state = {
    data: BODIES,
    offset: 0,
    perPage: 20,
    numInstances: 500,
  };

  // Make API request for the current page of data using Axios
  loadData() {
    const URL = `/api/water?offset=${this.state.offset}&limit=${this.state.perPage}`;
    // const URL = `https://jsonplaceholder.typicode.com/users`;
    // const URL = `https://api.conservocean.me/api/impacts?offset={this.state.offset}&limit={this.state.perPage}`;
    axios.get(URL)
      .then((response) => {
        this.setState({
          // Update the data and number of instances
          // data: this.state.data.concat(BODIES),
          data: response.data.data,
          numInstances: this.state.numInstances,
          // numInstances: response.data.numInstances,
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
        <Link
          to={`${match.url}/${body.id}`}
          className="card-link"
        >
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

        <img className="card-image" src={body.mapImgPath} width="100%"></img>
        <div className="card-body">
          <h5 className="card-title">{body.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Latitude: {body.latitude}</li>
          <li className="list-group-item">Longitude: {body.longitude}</li>
          <li className="list-group-item">
            Size: {body.size} miles
          </li>
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
  const initialWaterState: waterBody = {
  }

  // Getter and setter for species state
  const [body, setWaterBody] = useState(initialWaterState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getWaterBody = async () => {
      // Pass param to the API call
      const { data }: any = await axios(`/api/water/${props.match.params.id}`);
      // Update state
      setWaterBody(data.data[0]);
    }
    // Invoke the async function
    getWaterBody();
  }, []);

  // Return data
  return (
    <div className="bg-light full-height">
        <main className="container py-5" style={{ height: "100%" }}>
          <h1 className="text-center">{body.name} </h1>
          <div className="container" style={{ width: "80%" }}>
              {
                body.latitude && body.longitude ? 
                <div style={{ width: "100%", height: "500px" }}>
                <Map
                lat={Number(body.latitude)}
                lng={Number(body.longitude)}
                zoom={4}
                />
                </div>
              : <div></div>
              }
              
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
            </ul>
          </div>
        </main>
      </div>
  )
}

export default WaterBodies;
