import React from "react";
import RecipesAndCaloriesBubble from "./RecipesAndCaloriesBubble";
import TempAndPlants from "./TempAndPlants";
import RecipesPerFamilyPie from "./RecipesPerFamily";

export default function ProviderVisualizations() {
  return (
    <div className="container">
      <div className="mb-5">
        <h2>Provider Visualizations</h2>
        <h4>Number of Recipes Per Calorie Range</h4>
        <RecipesAndCaloriesBubble />

        <h4>Number of Plants Grown In Specific Temperature Ranges</h4>
        <TempAndPlants />

        <h4>Number of Recipes Per Plant Family</h4>
        <RecipesPerFamilyPie />
      </div>
    </div>
  );
}
