import React from "react";
import * as d3 from "d3";

class PollutionInWaterBubbleChart extends React.Component {
  constructor(props: any) {
    super(props);
    this.createBubbleChart = this.createBubbleChart.bind(this);
  }

  componentDidMount() {
    this.createBubbleChart();
  }

  createBubbleChart() {
    let json = {
      children: [
        { name: "Bay (16)", value: 16 },
        { name: "Coast (8)", value: 8 },
        { name: "Delta (5)", value: 5 },
        { name: "Escarpment (9)", value: 9 },
        { name: "Fan (6)", value: 6 },
        { name: "Lagoon (39)", value: 39 },
        { name: "Lake (10)", value: 10 },
        { name: "Reef (11)", value: 11 },
        { name: "Shoal (12)", value: 12 },
        { name: "Large Marine Ecosystem (17)", value: 17 },
      ],
    };

    let diameter = 800,
      color = d3.scaleOrdinal([
        "#042938",
        "#0f3f55",
        "#1b5269",
        "#26617b",
        "#2f6f8c",
        "#387e9f",
        "#387e9f",
      ]);

    let bubble = d3.pack().size([diameter, diameter]).padding(5);

    let margin = {
      left: 0,
      right: 100,
      top: 0,
      bottom: 0,
    };

    let svg = d3
      .select("#stateCompanyBubbleChart")
      .append("svg")
      .attr("viewBox", "0 0 " + (diameter + margin.right) + " " + diameter)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("class", "chart-svg");

    let root: any = d3
      .hierarchy(json)
      .sum(function (d: any) {
        return d.value;
      })
      .sort(function (a: any, b: any) {
        return b.value - a.value;
      });

    bubble(root);

    let node = svg
      .selectAll(".node")
      .data(root.children)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d: any) {
        return "translate(" + d.x + " " + d.y + ")";
      })
      .append("g")
      .attr("class", "graph");

    // Create a bubble
    node
      .append("circle")
      .attr("r", function (d: any) {
        return d.r;
      })
      .style("fill", function (d: any) {
        return color(d.data.name);
      });

    // Add names to bubbles
    node
      .append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.data.name;
      })
      .style("fill", "#FFF");
  }
  render() {
    return <div className="vis-container" id="stateCompanyBubbleChart"></div>;
  }
}
export default PollutionInWaterBubbleChart;
