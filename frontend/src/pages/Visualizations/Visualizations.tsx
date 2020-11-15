import React from "react";
import PollutionInWaterBubbleChart from "./PollutionInWaterBubbleChart";
import EndangeredStatusPieChart from "./EndangeredStatusPieChart";
import RecipesAndCaloriesBubble from "./RecipesAndCaloriesBubble";
import TempAndPlants from "./TempAndPlants";
import RecipesPerFamily from "./RecipesPerFamily"
import RecipesPerFamilyPie from "./RecipesPerFamily";
import PopulationTrendsandPollutionBarGraph from "./PopulationTrendsandPollutionBarGraph"

export default function Visualizations() {
  return (
    <div className="container">
        <h2>Conservocean Visualizations</h2>
        <h4>Pollution Per Water Body Types</h4>
        <PollutionInWaterBubbleChart />

        <h4>Species Per Endangered Status</h4>
        <EndangeredStatusPieChart />

        <h4>Population Trend VS Amount of Pollution</h4>
        <PopulationTrendsandPollutionBarGraph />

        <h2>Provider Visualizations</h2>
        <h4>Number of Recipes Per Calorie Range</h4>
        <RecipesAndCaloriesBubble />
        {/* <br/>
        <br/>
        <br/> */}
        <h4>Number of Plants Grown In Specific Temperature Ranges</h4>
        <TempAndPlants />
        {/* <br/>
        <br/>
        <br/> */}
        <h4>Number of Recipes Per Plant Family</h4>
        <RecipesPerFamilyPie/>
    </div>
  );
}
