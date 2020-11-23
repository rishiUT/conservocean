import React from "react";
import * as d3 from "d3";

class RecipesAndCaloriesBubble extends React.Component {
  constructor(props: any) {
    super(props);
    this.createBubbleChart = this.createBubbleChart.bind(this);
  }

  componentDidMount() {
    this.createBubbleChart();
  }

  render() {
    return <div className="vis-container" id="recipeCalorieBubbleChart"></div>;
  }

  createBubbleChart() {
    var json = {
      children: [
        { name: "0 - 249", value: 4 },
        { name: "250 - 499", value: 13 },
        { name: "500 - 749", value: 12 },
        { name: "750 - 999", value: 11 },
        { name: "1000 - 1249", value: 11 },
        { name: "1250 - 1499", value: 8 },
        { name: "1500 - 1749", value: 8 },
        { name: "1750 - 1999", value: 4 },
        { name: "2000 - 2249", value: 6 },
        { name: "2250 - 2499", value: 8 },
        { name: "2500 - 2749", value: 4 },
        { name: "2750 - 2999", value: 4 },
        { name: "3000 - 3249", value: 2 },
        { name: "3250 - 3499", value: 2 },
        { name: "3500+", value: 4 },
      ],
    };

    var diameter = 850,
      color = d3.scaleOrdinal(d3.schemeCategory10);

    var bubble = d3.pack().size([diameter, diameter]).padding(5);

    var margin = {
      left: 0,
      right: 100,
      top: 0,
      bottom: 0,
    };

    var svg = d3
      .select("#recipeCalorieBubbleChart")
      .append("svg")
      .attr("viewBox", "0 0 " + (diameter + margin.right) + " " + diameter)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("class", "chart-svg");

    var root: any = d3
      .hierarchy(json)
      .sum(function (d: any) {
        return d.value;
      })
      .sort(function (a: any, b: any) {
        return b.value - a.value;
      });

    bubble(root);

    var node = svg
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
      .style("fill", "#000000");
  }
}

export default RecipesAndCaloriesBubble;
