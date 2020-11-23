import React from "react";
import Select from "react-select";

export default function Form(props: any) {
  return (
    <div className="form-group">
      <div className="form-row">
        <Select
          closeMenuOnSelect={false}
          options={props.filterOptions}
          onChange={props.handleFilterSelectChange}
          isMulti
          className="form-select mb-2 col-9"
        />
        <button
          type="button"
          className="btn btn-primary col mb-2"
          onClick={props.filter}
        >
          Filter
        </button>
      </div>
      <div className="form-row">
        <Select
          options={props.sortOptions}
          onChange={props.handleSortSelectChange}
          className="form-select mb-2 col-9"
        />

        <button
          type="button"
          className="btn btn-primary col mb-2"
          onClick={props.filter}
        >
          Sort
        </button>
      </div>
      <form
        className="form form-row"
        id="searchForm"
        onSubmit={props.handleSearch}
      >
        <input
          type="text"
          id="search"
          placeholder="Search..."
          className="input form-control mb-2 col-9"
          style={{ marginLeft: 5, paddingLeft: 10, marginRight: 5 }}
        />
        <button type="submit" className="btn btn-primary col mb-2">
          Search
        </button>
      </form>
    </div>
  );
}
