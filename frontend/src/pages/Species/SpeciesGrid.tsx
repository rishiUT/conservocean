import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import Species from "./Species";
import SpeciesCard from "./SpeciesCard";
import algoliasearch from 'algoliasearch/lite';

  
const searchClient = algoliasearch('VEMEIF8QHL', 'e211f5541054cdb5177282492d4a90c8');
const index = searchClient.initIndex('conservocean-fish');


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
  {
    label: "Name",
    options: [
      { value: "sort=common_name", label: "A to Z" },
      { value: "sort=common_name&ascending=false", label: "Z to A" },
    ],
  },
  {
    label: "Genus",
    options: [
      { value: "sort=genus", label: "A to Z" },
      { value: "sort=genus&ascending=false", label: "Z to A" },
    ],
  },
  {
    label: "Species",
    options: [
      { value: "sort=species", label: "A to Z" },
      { value: "sort=species&ascending=false", label: "Z to A" },
    ],
  },
  {
    label: "Endangered Status",
    options: [
      { value: "sort=status", label: "A to Z" },
      { value: "sort=status&ascending=false", label: "Z to A" },
    ],
  },
  {
    label: "Average Size",
    options: [
      { value: "sort=average_size", label: "Ascending" },
      { value: "sort=average_size&ascending=false", label: "Descending" },
    ],
  },
];

// Display a grid of all available species
class SpeciesGrid extends Component {
  state = {
    data: [],
    offset: 0,
    perPage: 12,
    numInstances: 500,
    currentFilter: "",
    currentSort: "",
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
    // Call API using currently applied filters
    this.loadData();
  };

  // Update the filter state when selections change
  handleFilterSelectChange = (selectedOptions: any) => {
    let filters: any[] = selectedOptions;
    let queryParams: string = "";

    if (filters) {
      filters.forEach((filter) => {
        queryParams += filter.value;
      });
    }

    this.setState({ currentFilter: queryParams });
  };

  handleSortSelectChange = (selectedOption: any) => {
    console.log(selectedOption);
    if (selectedOption) {
      this.setState({ currentSort: selectedOption.value });
    }
  };

  search() {
    let query = 'shark';
    index.search(query).then(({ hits }) => {
      console.log(hits);
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/species">
          <div className="bg-light full-height">
            <div className="container">
              <h2 className="py-5 text-center">Species</h2>
              <div>
                <div
                  style={{ zIndex: 100, position: "relative", width: "100%" }}
                >
                  <Select
                    closeMenuOnSelect={false}
                    options={groupedFiltering}
                    onChange={this.handleFilterSelectChange}
                    isMulti
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.filter}
                  >
                    Filter
                  </button>

                  <Select
                    options={groupedSorting}
                    onChange={this.handleSortSelectChange}
                  />

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.filter}
                  >
                    Sort
                  </button>

                  <div>
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.search}
                  >
                    Search
                  </button>

                </div>
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
        <Route path={`/species/:id`} component={Species} />
      </Switch>
    );
  }
}

export default SpeciesGrid;
