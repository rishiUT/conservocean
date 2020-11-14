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
      var entries = [];
      for (var key in map) entries.push({key: key, value: map[key]});
      return entries;
  }

  createPieChart() {
    // set the dimensions and margins of the graph
    var width = 800,
      height = 800,
      margin = 100;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select("#endangeredStatusPieChart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Conservocean Data
    var data = {
      "Least Concern": 1151,
      "Critically Endangered": 5,
      "Endangered": 13,
      "Vulnerable": 34,
      "Near Threatened": 29,
      "Extinct": 1,
      "Data Deficient": 68,
    };

    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain([
      "Critically Endangered",
      "Endangered",
      "Vulnerable",
      "Near Threatened",
      "Extinct",
      "Data Deficient",
      "Least Concern"])
      .range(d3.schemeBlues[7]);

    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(function (d: any) {
        return d.value;
      });
    var data_ready = pie(this.entries(data) as any);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0)
      .outerRadius(radius * 1);

    // This arc exists for label positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 1.7);

    // Build pie chart
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", function (d: any): any {
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", .75);

    // Add the polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d: any): any {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d) ; // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d: any) {
        console.log(d.data.key);
        return d.data.key;
      })
      .attr("transform", function (d: any): any {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * .8 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }

  render() {
    return <div id="endangeredStatusPieChart"></div>;
  }
}

export default EndangeredStatusPieChart;
