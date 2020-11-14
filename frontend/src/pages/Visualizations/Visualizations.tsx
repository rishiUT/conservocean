import React from "react";
import PollutionInWaterBubbleChart from "./PollutionInWaterBubbleChart";
import EndangeredStatusPieChart from "./EndageredStatusPieChart";

export default function Visualizations() {
  return (
    <div className="container">
        <h2>Conservocean Visualizations</h2>
        <h4>Pollution Per Water Body Types</h4>
        <PollutionInWaterBubbleChart />

        <h4>Species Per Endangered Status</h4>
        <EndangeredStatusPieChart />

        <h2>Provider Visualizations</h2>

    </div>
  );
}
