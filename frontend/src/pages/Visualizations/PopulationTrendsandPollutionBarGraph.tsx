import React from "react";
import * as d3 from "d3";

class PopulationTrendsandPollutionBarGraph extends React.Component {
  constructor(props: any) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  createBarChart() {
    // set the dimensions and margins of the graph
    let margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 750 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3
      .select("#PopulationTrendsandPollutionBarGraph")
      .append("svg")
      .attr(
        "viewBox",
        "0 0 " +
          (width + margin.left + margin.right) +
          " " +
          (height + margin.top + margin.bottom)
      )
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let data = [
      { trend: "Least Concern", value: 23 },
      { trend: "Vulnerable", value: 24 },
      { trend: "Near Threatened", value: 17 },
      { trend: "Endangered", value: 9 },
      { trend: "Critically Endangered", value: 25 },
    ];

    // X axis: scale and draw:
    let x = d3
      .scaleBand()
      .domain(
        data.map(function (d) {
          return d.trend;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis: scale and draw:
    let y = d3.scaleLinear().range([height, 0]);
    y.domain([0, 30]); // d3.hist has to be called before the Y axis obviously
    svg.append("g").call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return "translate(" + x(d.trend) + "," + y(d.value) + ")";
      })
      .attr("width", function (d) {
        return width / data.length;
      })
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .style("fill", "#4b97c9")
      .attr("stroke", "black");
  }

  render() {
    return (
      <div
        className="vis-container"
        id="PopulationTrendsandPollutionBarGraph"
      ></div>
    );
  }
}
export default PopulationTrendsandPollutionBarGraph;
