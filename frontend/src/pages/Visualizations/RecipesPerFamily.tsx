import React from "react";
import * as d3 from "d3";

class RecipesPerFamilyPie extends React.Component {
  constructor(props: any) {
    super(props);
    this.createPieChart = this.createPieChart.bind(this);
  }

  componentDidMount() {
    this.createPieChart();
  }

  entries(map: any) {
    var entries = [];
    for (var key in map) entries.push({ key: key, value: map[key] });
    return entries;
  }

  createPieChart() {
    // set the dimensions and margins of the graph
    var width = 1000,
      height = 1000,
      margin = 120;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select("#recipesPerFamilyPieChart")
      .append("svg")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Conservocean Data
    var data = {
      Euphorbiaceae: 8,
      Amaryllidaceae: 53,
      Dioscoreaceae: 8,
      Brassicaceae: 9,
      Rosaceae: 9,
      Costaceae: 10,
      Asteraceae: 10,
      Poaceae: 11,
      Cucurbitaceae: 14,
      Other: 16,
      Solanaceae: 22,
      Zingiberaceae: 24,
      Lamiaceae: 31,
      Ericaceae: 31,
      Apiaceae: 40,
      Fabaceae: 51,
      Amaranthaceae: 7,
    };

    var keys = Object.keys(data);
    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(keys)
      .range([
        "#3366cc",
        "#dc3912",
        "#ff9900",
        "#109618",
        "#990099",
        "#0099c6",
        "#dd4477",
        "#66aa00",
        "#b82e2e",
        "#316395",
        "#994499",
        "#22aa99",
        "#aaaa11",
        "#6633cc",
        "#e67300",
        "#8b0707",
        "#651067",
        "#329262",
        "#5574a6",
        "#3b3eac",
      ]);

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
      .outerRadius(radius * 0.8);

    // This arc exists for label positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

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
      .style("opacity", 0.75);

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
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
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
        return d.data.key;
      })
      .attr("transform", function (d: any): any {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  }

  render() {
    return <div className="vis-container" id="recipesPerFamilyPieChart"></div>;
  }
}

export default RecipesPerFamilyPie;
