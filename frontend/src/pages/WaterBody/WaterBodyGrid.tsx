import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import WaterBody from "./WaterBody";
import WBCard from "./WaterBodyCard";
import algoliasearch from "algoliasearch/lite";
import PageContainer from "../../parts/PageContainer";
import Form from "../../parts/Form";
import ErrorPage from "../ErrorPages/UnknownError";
import NoResponseError from "../ErrorPages/NoResponse";
import MysteryError from "../ErrorPages/NoErrorCode";

// Keys for Algolia search
const searchClient = algoliasearch(
  "VEMEIF8QHL",
  "e211f5541054cdb5177282492d4a90c8"
);
const index = searchClient.initIndex("conservocean-water");

// Defines info expected in a waterbody client
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

// Filtering Categories and API calls
const longitude = [
  { value: "long_min=0&long_max=89", label: "longitude = 0 - 89" },
  { value: "long_min=90&long_max=180", label: "longitude = 90 - 180" },
  { value: "long_min=-180&long_max=-91", label: "longitude = -180 - -91" },
  { value: "long_min=-90&long_max=-1", label: "longitude = -90 - -1" },
];

const latitude = [
  { value: "lat_min=-30&lat_max=-1", label: "latitude = -30 - -1" },
  { value: "lat_min=0&lat_max=29", label: "latitude = 0 - 29" },
  { value: "lat_min=30&lat_max=59", label: "latitude = 30 - 59" },
  { value: "lat_min=60&lat_max=90", label: "latitude = 60 - 90" },
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
  { value: "size_min=6000&size_max=100000", label: "6000+" },
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
  {
    label: "Name",
    options: [
      { value: "sort=name", label: "A to Z" },
      { value: "sort=name&ascending=false", label: "Z to A" },
    ],
  },
  {
    label: "Longitude",
    options: [
      { value: "sort=longitude", label: "Ascending" },
      { value: "sort=longitude&ascending=false", label: "Descending" },
    ],
  },
  {
    label: "Latitude",
    options: [
      { value: "sort=latitude", label: "Ascending" },
      { value: "sort=latitude&ascending=false", label: "Descending" },
    ],
  },
  {
    label: "Temperature",
    options: [
      { value: "sort=water_temp", label: "Ascending" },
      { value: "sort=water_temp&ascending=false", label: "Descending" },
    ],
  },
  {
    label: "Size",
    options: [
      { value: "sort=size", label: "Ascending" },
      { value: "sort=size&ascending=false", label: "Descending" },
    ],
  },
];

// Display a grid of all bodies of water
class WaterBodies extends Component {
  state = {
    data: BODIES,
    offset: 0,
    perPage: 12,
    numInstances: 500,
    currentFilter: "",
    currentSort: "",
    currentSearch: "",
    usingSearchData: false,
    highlightableAttributes: ["name"],
  };

  axiosErrorCatch(error: any) {
    if (error.response) {
      //client received an error response (4xx or 5xx)
      return ErrorPage({ errorid: error.response.status });
    } else if (error.request) {
      //client never received a response, or the request never left
      return NoResponseError();
    } else {
      //something else, unrelated to axios
      return MysteryError();
    }
  }

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
      .catch((error) => this.axiosErrorCatch(error));

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
      .catch((error) => this.axiosErrorCatch(error));
  }

  // Load initial data after component added to document
  componentDidMount() {
    this.loadData();
  }

  // Go to the next page of data
  handlePageClick = (data: any) => {
    // Change Offset: offset = (page number) x (# per page)
    this.setState({ offset: data.selected * this.state.perPage }, () => {
      if (this.state.usingSearchData) {
        this.search(this.state.currentSearch);
      } else {
        this.loadData();
      }
    });
  };

  // Filter button handler that creates API path
  // Queries API for the filter's selections
  filter = () => {
    this.setState(
      {
        currentSearch: "",
        usingSearchData: false,
        offset: 0,
      },
      () => this.loadData()
    );
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

  // Update the sorting state when selections change
  handleSortSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      this.setState({ currentSort: selectedOption.value });
    }
  };

  // Returns a search for a term given by a user
  search(query: string) {
    index
      .search(query, {
        hitsPerPage: this.state.perPage,
        page: this.state.offset / this.state.perPage,
        attributesToHighlight: this.state.highlightableAttributes,
        highlightPreTag: '<em class="search-highlight">',
        highlightPostTag: "</em>",
      })
      .then(({ hits, nbHits }) => {
        // Apply highlighting to returned results
        hits.forEach((hit: any) => {
          let result: any = hit._highlightResult;
          if (result) {
            Object.keys(result).forEach((key) => {
              if (result[key].value !== "none") {
                hit[key] = result[key].value;
              }
            });
          }
        });

        this.setState({
          data: hits,
          numInstances: nbHits,
          currentSearch: query,
        });
      });
  }

  // Handle search events when search form is submitted
  handleSearch(e: any) {
    e.preventDefault();

    const query = document.getElementById("search") as HTMLInputElement;
    const form = document.getElementById("searchForm") as HTMLFormElement;

    if (query.value !== "") {
      this.setState({ usingSearchData: true });

      this.search(query.value);

      form.reset();
    } else {
      this.setState({ usingSearchData: false });
      this.loadData();
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/water-bodies">
          <PageContainer>
            <h2 className="py-5 text-center">Bodies of Water</h2>
            <Form
              filterOptions={groupedFiltering}
              sortOptions={groupedSorting}
              handleFilterSelectChange={this.handleFilterSelectChange}
              handleSortSelectChange={this.handleSortSelectChange}
              filter={this.filter}
              handleSearch={(e: any) => this.handleSearch(e)}
            />

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
          </PageContainer>
        </Route>
        <Route path={`/water-bodies/:id`} component={WaterBody} />
      </Switch>
    );
  }
}

export default WaterBodies;
