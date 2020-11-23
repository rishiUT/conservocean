import React from "react";
import * as d3 from "d3";

class TempAndPlantsBar extends React.Component {
  constructor(props: any) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  createBarChart() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 750 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select("#tempAndPlantsBar")
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

    var data = [
      { range: "25 - 29", value: 11 },
      { range: "30 - 34", value: 148 },
      { range: "35 - 39", value: 93 },
      { range: "40 - 44", value: 160 },
      { range: "45 - 49", value: 213 },
      { range: "50 - 54", value: 317 },
      { range: "55 - 59", value: 291 },
      { range: "60 - 64", value: 513 },
      { range: "65 - 69", value: 266 },
      { range: "70 - 74", value: 278 },
      { range: "75 - 79", value: 143 },
      { range: "80 - 84", value: 102 },
      { range: "85 - 89", value: 84 },
      { range: "90 - 94", value: 15 },
    ];

    // X axis: scale and draw:
    var x = d3
      .scaleBand()
      .domain(
        data.map(function (d) {
          return d.range;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis: scale and draw:
    var y = d3.scaleLinear().range([height, 0]);
    y.domain([0, 550]); // d3.hist has to be called before the Y axis obviously
    svg.append("g").call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", function (d) {
        return "translate(" + x(d.range) + "," + y(d.value) + ")";
      })
      .attr("width", function (d) {
        return width / data.length;
      })
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .style("fill", "#69b3a2");
  }

  render() {
    return <div className="vis-container" id="tempAndPlantsBar"></div>;
  }
}
export default TempAndPlantsBar;
