import React from 'react';
import * as d3 from 'd3';

class PollutionInWaterBubbleChart extends React.Component {
    constructor(props: any) {
        super(props);
        this.createBubbleChart = this.createBubbleChart.bind(this);
    }

    componentDidMount() {
        this.createBubbleChart();
    }

    createBubbleChart() {
        var json = {
            'children': [
              {'name': 'New York', 'value': 8},
              {'name': 'California', 'value': 31},
              {'name': 'Texas', 'value': 8},
              {'name': 'Illinois', 'value': 5},
              {'name': 'Pennsylvania', 'value': 6},
              {'name': 'Arizona', 'value': 1},
              {'name': 'Indiana', 'value': 1},
              {'name': 'Florida', 'value': 4},
              {'name': 'Ohio', 'value': 5},
              {'name': 'North Carolina', 'value': 3},
              {'name': 'Michigan', 'value': 1},
              {'name': 'Tennessee', 'value': 1},
              {'name': 'Washington', 'value': 4},
              {'name': 'District Of Columbia', 'value': 1},
              {'name': 'Massachusetts', 'value': 7},
              {'name': 'Missouri', 'value': 1},
              {'name': 'Maryland', 'value': 1},
              {'name': 'Oregon', 'value': 1},
              {'name': 'Wisconsin', 'value': 1},
              {'name': 'Virginia', 'value': 2},
              {'name': 'Georgia', 'value': 4},
              {'name': 'Minnesota', 'value': 3},
              {'name': 'New Jersey', 'value': 4},
            ]
          }
          
          var diameter = 600,
              color = d3.scaleOrdinal(["#042938", "#0f3f55", "#1b5269", "#26617b", "#2f6f8c", "#387e9f", "#387e9f"]);
          
          var bubble = d3.pack()
            .size([diameter, diameter])
            .padding(5);
          
          var margin = {
            left: 0,
            right: 100,
            top: 0,
            bottom: 0
          }
          
          var svg = d3.select('#stateCompanyBubbleChart').append('svg')
            .attr('viewBox','0 0 ' + (diameter + margin.right) + ' ' + diameter)
            .attr('width', (diameter + margin.right))
            .attr('height', diameter)
            .attr('class', 'chart-svg');
          
          var root:any = d3.hierarchy(json)
            .sum(function(d:any) { return d.value; })
            .sort(function(a:any, b:any) { return b.value - a.value; });
          
          bubble(root);
          
          var node = svg.selectAll('.node')
            .data(root.children)
            .enter()
            .append('g').attr('class', 'node')
            .attr('transform', function(d:any) { return 'translate(' + d.x + ' ' + d.y + ')'; })
            .append('g').attr('class', 'graph');
          
          // Create a bubble
          node.append("circle")
            .attr("r", function(d:any) { return d.r; })
            .style("fill", function(d:any) { 
              return color(d.data.name); 
            });
          
          // Add names to bubbles
          node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d:any) { return d.data.name; })
            .style("fill", "#000000");
    }
    render() {
        return <div className="vis-container" id="stateCompanyBubbleChart"></div>
    }
}
export default PollutionInWaterBubbleChart;