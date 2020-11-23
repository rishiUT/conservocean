import React from "react";
import PollutionInWaterBubbleChart from "./PollutionInWaterBubbleChart";
import EndangeredStatusPieChart from "./EndangeredStatusPieChart";
import PopulationTrendsandPollutionBarGraph from "./PopulationTrendsandPollutionBarGraph";

export default function Visualizations() {
  return (
    <div className="container">
      <div className="mb-5">
        <h2>ConservOcean Visualizations</h2>
        <h4>Average Number of Human Impacts Per Water Body Types</h4>
        <PollutionInWaterBubbleChart />

        <h4>Species Per Endangered Status</h4>
        <EndangeredStatusPieChart />

        <h4>
          Endangered Status vs Average Number of Relevant Human Impact Instances
        </h4>
        <PopulationTrendsandPollutionBarGraph />
      </div>
    </div>
  );
}
