import React from 'react';
import * as d3 from 'd3';
import { ReactComponent } from '*.svg';

class PopulationTrendsandPollutionBarGraph extends React.Component {
    constructor(props: any) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart();
    }
    
    createBarChart(){
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 40},
            width = 750 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#PopulationTrendsandPollutionBarGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        
        var data = [
            {'trend': "Stable" ,'value': 11},
            {'trend': "Increasing", 'value': 148},
            {'trend': "Decreasing", 'value': 93},
        ]

        // X axis: scale and draw:
        var x = d3.scaleBand()
            .domain(data.map(function(d){ return d.trend;}))   
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Y axis: scale and draw:
        var y = d3.scaleLinear()
            .range([height, 0]);
            y.domain([0, 200]);   // d3.hist has to be called before the Y axis obviously
        svg.append("g")
            .call(d3.axisLeft(y));

        // append the bar rectangles to the svg element
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", 1)
                .attr("transform", function(d) { return "translate(" + x(d.trend) + "," + y(d.value) + ")"; })
                .attr("width", function(d) { return width / data.length ; })
                .attr("height", function(d) { return height - y(d.value); })
                .style("fill", "#4b97c9")

        }

    render() {
        return <div className="vis-container" id="PopulationTrendsandPollutionBarGraph"></div>
    }
    
}
export default PopulationTrendsandPollutionBarGraph