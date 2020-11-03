import React, { Component, useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch, useLocation } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Select from "react-select";

interface species {
  id?: number;
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

// Map each IUCN status code into its text description
const IUCN_STATUS: { [key: string]: string } = {
  NE: "Not evaluated",
  DD: "Data deficient",
  LC: "Least concern",
  NT: "Near threatened",
  VU: "Vulnerable",
  EN: "Endangered",
  CR: "Critically endangered",
  EW: "Extinct in the wild",
  EX: "Extinct",
};

// Map habitat code into text description
const HABITATS: { [key: string]: string } = {
  "-1 -1 -1": "freshwater, brackish water, saltwater",
  "-1 -1 0": "freshwater, brackish water",
  "-1 0 -1": "freshwater, saltwater",
  "-1 0 0": "freshwater",
  "0 -1 -1": "brackish water, saltwater",
  "0 -1 0": "brackish water",
  "0 0 -1": "saltwater",
};

// Filtering Categories

const population_trend = [
  { value: "population_trend=Unknown", label: "Unknown" },
  { value: "population_trend=Stable", label: "Stable" },
  { value: "population_trend=Increasing", label: "Increasing" },
  { value: "population_trend=Decreasing", label: "Decreasing" },
];

const status = [
  { value: "status=NE", label: "Not Evaluated" },
  { value: "status=DD", label: "Data Deficient" },
  { value: "status=LC", label: "Least Concern" },
  { value: "status=NT", label: "Near Threatened" },
  { value: "status=VU", label: "Vulnerable" },
  { value: "status=EN", label: "Endangered" },
  { value: "status=CR", label: "Critically Endangered" },
  { value: "status=EW", label: "Extinct in the Wild" },
  { value: "status=EX", label: "Extinct" },
];

const size = [
  { value: "1", label: "1 - 99" },
  { value: "100", label: "100 - 199" },
  { value: "200", label: "200 - 299" },
  { value: "300", label: "300 - 399" },
  { value: "400", label: "400 - 499" },
  { value: "500", label: "500 - 599" },
  { value: "600", label: "600+" },
  { value: "null", label: "Unknown" },
];

const catch_rate = [
  { value: "1", label: "1 - 99" },
  { value: "100", label: "100 - 199" },
  { value: "200", label: "200 - 299" },
  { value: "300", label: "300 - 399" },
  { value: "400", label: "400 - 499" },
  { value: "500", label: "500 - 599" },
  { value: "600", label: "600+" },
  { value: "null", label: "Unknown" },
];

const habitat = [
  { value: "habitat=saltwater", label: "Saltwater" },
  { value: "habitat=freshwater", label: "Freshwater" },
  { value: "habitat=brackish", label: "Brackish Water" },
];

const groupedFiltering = [
  { label: "Population Trend", options: population_trend },
  { label: "IUCN Status", options: status },
  { label: "Average Size", options: size },
  { label: "Catch Rate", options: catch_rate },
  { label: "Habitat", options: habitat },
];

// Defines the categories and API calls for sorting
const groupedSorting = [
  { label: "Name", options: [{value: "sort=common_name", label: "A to Z"}, {value: "sort=common_name&ascending=false", label: "Z to A"}]},
  { label: "Genus", options: [{value: "sort=genus", label: "A to Z"}, {value: "sort=genus&ascending=false", label: "Z to A"}]},
  { label: "Species", options: [{value: "sort=species", label: "A to Z"}, {value: "sort=species&ascending=false", label: "Z to A"}]},
  { label: "Endangered Status", options: [{value: "sort=status", label: "A to Z"}, {value: "sort=status&ascending=false", label: "Z to A"}]},
  { label: "Average Size", options: [{value: "sort=average_size", label: "Ascending"}, {value: "sort=average_size&ascending=false", label: "Descending"}]},
];

// Display a grid of all available species
class SpeciesGrid extends Component {
  state = {
    data: [],
    offset: 0,
    perPage: 12,
    numInstances: 500,
    currentFilter: "",
    currentSort: ""
  };

  // Make API request for the current page of data using Axios
  loadData() {
    let URL = `/api/fish?offset=${this.state.offset}&limit=${this.state.perPage}&${this.state.currentFilter}&${this.state.currentSort}`;
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

      URL = `/api/fish?${this.state.currentFilter}`;
      axios
      .get(URL)
      .then((response) => {
        this.setState({
          // Update the data and number of instances
          numInstances: response.data.total_fish_returned,
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
    console.log(selectedOption)
    if (selectedOption) {
      this.setState({currentSort: selectedOption.value});
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/species">
          <div className="bg-light full-height">
            <div className="container">
              <h2 className="py-5 text-center">Species</h2>
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
                {this.state.data.map((species: species) => (
                  <SpeciesCard key={species.id} sp={species} />
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
        <Route path={`/species/:id`} component={Species}/>
      </Switch>
    );
  }
}

function SpeciesCard(props: any) {
  let match = useRouteMatch();
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card mb-4 shadow-sm" style={{ position: "relative" }}>
        <Link to={`${match.url}/${props.sp.id}`} className="card-link">
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
          src={props.sp.picture_url}
          alt=""
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.sp.common_name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Genus: <span className="font-italic">{props.sp.genus}</span>
          </li>
          <li className="list-group-item">
            Species: <span className="font-italic">{props.sp.species}</span>
          </li>
          <li className="list-group-item">
            IUCN Status:{" "}
            {
              IUCN_STATUS[
                props.sp.endanger_status ? props.sp.endanger_status : "DD"
              ]
            }
          </li>
          <li className="list-group-item">
            Average Size: {props.sp.average_size} cm
          </li>
        </ul>
      </div>
    </div>
  );
}

class Species extends Component<any> {
  state: {species: species} = {
    species: {},
  }

  // Make API request for the current page of data using Axios
  loadData() {
    let URL = `/api/fish/${this.props.match.params.id}/`;
    // let URL = `/api/fish?offset=${this.props.match.params.id-1}&limit=1`;
    axios
      .get(URL)
      .then((response) => {
        this.setState({
          // Update the data and number of instances
          species: response.data.data
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

  render() {
    return (
      <div className="bg-light full-height">
        <main className="container py-5">
          <h1 className="text-center">{this.state.species.common_name} </h1>
          <div className="container" style={{ width: "80%" }}>
            {this.state.species.picture_url ? (
              <img
                className="py-5"
                src={this.state.species.picture_url}
                width="100%"
                alt={this.state.species.common_name}
              ></img>
            ) : null}
  
            <h3>Species Details</h3>
            <ul>
              {this.state.species.family ? (
                <li>
                  {" "}
                  Family: <i>{this.state.species.family}</i>
                </li>
              ) : null}
              {this.state.species.genus ? (
                <li>
                  Genus: <i>{this.state.species.genus}</i>
                </li>
              ) : null}
              {this.state.species.species ? (
                <li>
                  Species: <i>{this.state.species.species}</i>
                </li>
              ) : null}
              {this.state.species.habitat ? (
                <li>Habitat: {HABITATS[this.state.species.habitat]}</li>
              ) : null}
              {this.state.species.endanger_status ? (
                <li>Endangered Status: {IUCN_STATUS[this.state.species.endanger_status]}</li>
              ) : null}
              {this.state.species.population_trend ? (
                <li>Population Trend: {this.state.species.population_trend}</li>
              ) : null}
              {this.state.species.average_size ? (
                <li>Average Size: {this.state.species.average_size} cm</li>
              ) : null}
              {this.state.species.description ? (
                <li>Description: {this.state.species.description}</li>
              ) : null}
              {this.state.species.speccode ? <li>Spec. Code: {this.state.species.speccode}</li> : null}
              {this.state.species.catch_year ? (
                <li>Catch Year: {this.state.species.catch_year}</li>
              ) : null}
              {this.state.species.catch_rate ? (
                <li>Catch Rate: {this.state.species.catch_rate}</li>
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

}

// // Display content for an individual species page
// function Species(props: any) {
//   // Set initial state
//   const initialSpeciesState: species = {};

//   // Getter and setter for species state
//   const [species, setSpecies] = useState(initialSpeciesState);

//   // Use useEffect to retrieve data from API
//   useEffect(() => {
//     const getSpecies = async () => {
//       // Pass param to the API call
//       const { data }: any = await axios.get(`/api/fish/${props.match.params.id}`);
//       // Update state
//       setSpecies(data.data);
//     };
//     // Invoke the async function
//     getSpecies();

//     // Let the linter know that there are no dependencies that will require 
//     // calling this function again
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Return data
  // return species ? (
  //   <div className="bg-light full-height">
  //     <main className="container py-5">
  //       <h1 className="text-center">{species.common_name} </h1>
  //       <div className="container" style={{ width: "80%" }}>
  //         {species.picture_url ? (
  //           <img
  //             className="py-5"
  //             src={species.picture_url}
  //             width="100%"
  //             alt={species.common_name}
  //           ></img>
  //         ) : null}

  //         <h3>Species Details</h3>
  //         <ul>
  //           {species.family ? (
  //             <li>
  //               {" "}
  //               Family: <i>{species.family}</i>
  //             </li>
  //           ) : null}
  //           {species.genus ? (
  //             <li>
  //               Genus: <i>{species.genus}</i>
  //             </li>
  //           ) : null}
  //           {species.species ? (
  //             <li>
  //               Species: <i>{species.species}</i>
  //             </li>
  //           ) : null}
  //           {species.habitat ? (
  //             <li>Habitat: {HABITATS[species.habitat]}</li>
  //           ) : null}
  //           {species.endanger_status ? (
  //             <li>Endangered Status: {IUCN_STATUS[species.endanger_status]}</li>
  //           ) : null}
  //           {species.population_trend ? (
  //             <li>Population Trend: {species.population_trend}</li>
  //           ) : null}
  //           {species.average_size ? (
  //             <li>Average Size: {species.average_size} cm</li>
  //           ) : null}
  //           {species.description ? (
  //             <li>Description: {species.description}</li>
  //           ) : null}
  //           {species.speccode ? <li>Spec. Code: {species.speccode}</li> : null}
  //           {species.catch_year ? (
  //             <li>Catch Year: {species.catch_year}</li>
  //           ) : null}
  //           {species.catch_rate ? (
  //             <li>Catch Rate: {species.catch_rate}</li>
  //           ) : null}
  //           {/* {species.human_impact_ids ? (
  //             <li>
  //               Human Impacts that Affect the Species:{" "}
  //               {species.human_impact_ids}
  //             </li>
  //           ) : null} */}
  //         </ul>
  //       </div>
  //     </main>
  //   </div>
  // ) : (
  //   <div>Loading...</div>
  // );
// }

export default SpeciesGrid;
