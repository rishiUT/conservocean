import React from "react";
import * as d3 from "d3";

class EndangeredStatusPieChart extends React.Component {
  constructor(props: any) {
    super(props);
    this.createPieChart = this.createPieChart.bind(this);
  }

  componentDidMount() {
    this.createPieChart();
  }

  entries(map: any) {
    let entries = [];
    for (let key in map) entries.push({ key: key, value: map[key] });
    return entries;
  }

  createPieChart() {
    let data: any = [
      { status: "Least Concern", count: 1151 },
      { status: "Near Threatened", count: 29 },
      { status: "Vulnerable", count: 34 },
      { status: "Endangered", count: 13 },
      { status: "Critically Endangered", count: 5 },
      { status: "Extinct", count: 1 },
      { status: "Data Deficient", count: 68 },
    ];

    let pie = d3.pie().value(function (d: any) {
      return d.count;
    });

    let slices = pie(data);

    let height = 600;
    let width = 600;
    let margin = 100;
    let radius = Math.min(width, height) / 2 - margin;
    let arc: any = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius * 0.95);

    // helper that returns a color based on an ID
    let color = d3.scaleOrdinal([
      "#015b5b",
      "#015b5b",
      "#c79002",
      "#c75b2a",
      "#c7292a",
      "#010101",
      "#aaaaaa",
    ]);

    let svg = d3
      .select("#endangeredStatusPieChart")
      .append("svg")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin meet");
    let g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    g.selectAll("path.slice")
      .data(slices)
      .enter()
      .append("path")
      .attr("class", "slice")
      .attr("d", arc)
      .attr("fill", function (d: any) {
        return color(d.data.status);
      })
      .attr("stroke", "white");

    // building a legend is as simple as binding
    // more elements to the same data. in this case,
    // <text> tags
    svg
      .append("g")
      .attr("class", "legend")
      .selectAll("text")
      .data(slices)
      .enter()
      .append("text")
      .text(function (d: any) {
        return "• " + d.data.status;
      })
      .attr("fill", function (d: any) {
        return color(d.data.status);
      })
      .attr("y", function (d, i) {
        return 20 * (i + 1);
      });
  }

  render() {
    return <div className="vis-container" id="endangeredStatusPieChart"></div>;
  }
}

export default EndangeredStatusPieChart;
