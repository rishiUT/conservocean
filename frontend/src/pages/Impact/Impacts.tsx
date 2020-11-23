import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Impact from "./ImpactInstance";
import algoliasearch from "algoliasearch/lite";
import PageContainer from "../../parts/PageContainer";
import Form from "../../parts/Form";
import ErrorPage from "../ErrorPages/UnknownError";
import NoResponseError from "../ErrorPages/NoResponse";
import MysteryError from "../ErrorPages/NoErrorCode";

// Keys to access Alggolia search
const searchClient = algoliasearch(
  "VEMEIF8QHL",
  "e211f5541054cdb5177282492d4a90c8"
);
const index = searchClient.initIndex("conservocean-impacts");

// The interface describes the expected attributes of an impact object
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

// Defines labels and values for the filtering categories in the dropdown menu
const subcategories = [
  { value: "subcategory=plastic_pollution", label: "Plastic Pollution" },
  { value: "subcategory=coal_power_plants", label: "Coal Power Plants" },
  { value: "subcategory=offshore_oil_spills", label: "Offshore Oil Spills" },
  { value: "subcategory=tanker_oil_spills", label: "Tanker Oil Spills" },
];

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

const groupedFiltering = [
  { label: "SubCategories", options: subcategories },
  { label: "Longitude", options: longitude },
  { label: "Latitude", options: latitude },
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
    label: "Subcategory",
    options: [
      { value: "sort=subcategory", label: "A to Z" },
      { value: "sort=subcategory&ascending=false", label: "Z to A" },
    ],
  },
  {
    label: "Count Density (only applicable to plastic pollution)",
    options: [
      { value: "sort=count_density_1", label: "Ascending" },
      { value: "sort=count_density_1&ascending=false", label: "Descending" },
    ],
  },
];

// Display a table of all available impacts
class Impacts extends Component {
  state = {
    data: [],
    offset: 0,
    perPage: 9,
    numInstances: 0,
    currentFilter: "",
    currentSort: "",
    currentSearch: "",
    usingSearchData: false,
    highlightableAttributes: ["name", "category", "subcategory"],
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
    axios
      .get(
        `/api/human?offset=${this.state.offset}&limit=${this.state.perPage}&${this.state.currentFilter}&${this.state.currentSort}`
      )
      .then((response) => {
        this.setState({
          // Update the data and number of instances
          data: response.data.data,
        });
      })
      .catch((error) => this.axiosErrorCatch(error));

    axios
      .get(`/api/human?${this.state.currentFilter}`)
      .then((response) => {
        this.setState({
          // Update the number of instances
          numInstances: response.data.total_impact_returned,
        });
      })
      .catch((error) => this.axiosErrorCatch(error));
  }

  // Component initially loads
  componentDidMount() {
    this.loadData();
  }

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

  thelems = [
    { text: "Impact" },
    { text: "Category" },
    { text: "Type" },
    { text: "Latitude" },
    { text: "Longitude" },
  ];

  makeTableHeaders() {
    return this.thelems.map((thelem) => (
      <th key={thelem.text} scope="col">
        {thelem.text}
      </th>
    ));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/impacts">
          <PageContainer>
            <h2 className="py-5 text-center">Human Impacts</h2>
            <Form
              filterOptions={groupedFiltering}
              sortOptions={groupedSorting}
              handleFilterSelectChange={this.handleFilterSelectChange}
              handleSortSelectChange={this.handleSortSelectChange}
              filter={this.filter}
              handleSearch={(e: any) => this.handleSearch(e)}
            />

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>{this.makeTableHeaders()}</tr>
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
          </PageContainer>
        </Route>
        <Route path={`/impacts/:id`} component={Impact} />
      </Switch>
    );
  }
}

// Function returns markup for impact info in table
function ImpactTableData({ impact }: any) {
  return (
    <tr>
      <th scope="row">
        <a href={`/impacts/${impact.id}`} className="card-link">
          {impact.name ? (
            <span dangerouslySetInnerHTML={{ __html: impact.name }}></span>
          ) : (
            `Plastic Pollution Sample ${impact.id - 5}`
          )}
        </a>
      </th>
      <td>
        <span dangerouslySetInnerHTML={{ __html: impact.category }}></span>
      </td>
      <td>
        <span
          dangerouslySetInnerHTML={{
            __html: impact.subcategory?.toLowerCase(),
          }}
        ></span>
      </td>
      <td>{impact.latitude}</td>
      <td>{impact.longitude}</td>
    </tr>
  );
}

export default Impacts;
