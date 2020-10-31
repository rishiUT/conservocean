import React, { Component, useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

interface species {
  scientific_name?: string;
  common_name?: string;
  species?: string;
  genus?: string;
  family?: string;
  habitat?: string;
  endanger_status?: string;
  population_trend?: string;
  average_size?: string;
  picture_url?: string;
  description?: string;
  speccode?: string;
  catch_year?: string;
  catch_rate?: string;
  human_impact_ids?: string;

  region?: string;
  fishingRate?: string;
  populationStatus?: string;
  habitatDescription?: string;
  physicalDescription?: string;
  fishingImpacts?: string;
  harvest?: string;
  biology?: string;
  imagePath?: string;
}

// Display a grid of all available species
class SpeciesGrid extends Component {
  state = {
    data: [],
    offset: 0,
    perPage: 20,
    numInstances: 500,
  };

  // Make API request for the current page of data using Axios
  loadData() {
    const URL = `/api/fish?offset=${this.state.offset}&limit=${this.state.perPage}`;
    axios
      .get(URL)
      .then((response) => {
        console.log(response);
        this.setState({
          // Update the data and number of instances
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

  // Load the next page of data
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
        <Route exact path="/species">
          <div className="bg-light full-height">
            <div className="container">
              <h2 className="py-5 text-center">Species</h2>

              <div className="row">
                {this.state.data.map((species: species) => (
                  <SpeciesCard key={species.common_name} species={species} />
                ))}
              </div>

              {/* Pagination */}
              <nav className="mb-4">
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
        <Route path={`/species/:id`} component={Species} />
      </Switch>
    );
  }
}

function SpeciesCard({ species }: any) {
  let match = useRouteMatch();
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
        <Link to={`${match.url}/${species.id}`} className="card-link">
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
          className="card-img-top"
          width="100%"
          src={species.picture_url}
          alt=""
        ></img>
        <div className="card-body">
          <h5 className="card-title">{species.common_name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Genus: <span className="font-italic">{species.genus}</span>
          </li>
          <li className="list-group-item">
            Species: <span className="font-italic">{species.species}</span>
          </li>
          <li className="list-group-item">
            IUCN Status: {species.endanger_status}
          </li>
          <li className="list-group-item">
            Fishing Rate: {species.fishingRate}
          </li>
        </ul>
      </div>
    </div>
  );
}

// Display content for an individual species page
function Species(props: any) {
  // Set initial state
  const initialSpeciesState: species = {};

  // Getter and setter for species state
  const [species, setSpecies] = useState(initialSpeciesState);

  // Use useEffect to retrieve data from API
  useEffect(() => {
    const getSpecies = async () => {
      // Pass param to the API call
      const { data }: any = await axios(`/api/fish/${props.match.params.id}`);
      // Update state
      setSpecies(data.data[0]);
    };
    // Invoke the async function
    getSpecies();
  }, []);

  // Return data
  return (
    <div className="bg-light full-height">
      <main className="container py-5">
        {/* <h1 className="text-center">{species.common_name} </h1> */}
        <div className="container" style={{ width: "80%" }}>
          {species.picture_url ? (
            <img
              className="py-5"
              src={species.picture_url}
              width="100%"
              alt={species.common_name}
            ></img>
          ) : null}

          <h3>Species Details</h3>
          <ul>
            {/* {species.scientific_name ? (
              <li>Scientific Name: {species.scientific_name}</li>
            ) : null} */}
            {species.family ? <li>Family: {species.family}</li> : null}
            {species.genus ? <li>Genus: {species.genus}</li> : null}
            {species.species ? <li>Species: {species.species}</li> : null}
            {species.habitat ? <li>Habitat: {species.habitat}</li> : null}
            {species.endanger_status ? (
              <li>Endangered Status: {species.endanger_status}</li>
            ) : null}
            {species.population_trend ? (
              <li>Population Trend: {species.population_trend}</li>
            ) : null}
            {species.average_size ? (
              <li>Average Size: {species.average_size}</li>
            ) : null}
            {species.description ? (
              <li>Description: {species.description}</li>
            ) : null}
            {species.speccode ? <li>Spec Code: {species.speccode}</li> : null}
            {species.catch_year ? (
              <li>Catch Year: {species.catch_year}</li>
            ) : null}
            {species.catch_rate ? (
              <li>Catch Rate: {species.catch_rate}</li>
            ) : null}
            {/* {species.human_impact_ids ? (
              <li>
                Human Impacts that Affect the Species:{" "}
                {species.human_impact_ids}
              </li>
            ) : null} */}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default SpeciesGrid;
