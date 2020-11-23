import React from "react";
import "bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Page Components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SpeciesGrid from "./pages/Species/SpeciesGrid";
import Impacts from "./pages/Impact/Impacts";
import WaterBodies from "./pages/WaterBody/WaterBodyGrid";
import Visualizations from "./pages/Visualizations/Visualizations";
import ProviderVisualizations from "./pages/Visualizations/ProviderVisualizations";

import Navbar from "./parts/Navbar";

function App() {
  return (
    <Router>
      <div>
        {/* Site-wide navigation bar */}
        <Navbar />

        {/* <Switch> renders the first route that matches current URL */}
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route path="/species" children={<SpeciesGrid />} />
          <Route path="/water-bodies" children={<WaterBodies />} />
          <Route path="/impacts" children={<Impacts />} />
          <Route path="/about" children={<About />} />
          <Route path="/visualizations" children={<Visualizations />} />
          <Route
            path="/provider-visualizations"
            children={<ProviderVisualizations />}
          />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function NoMatch() {
  return (
    <div className="container">
      <h1>Page not found.</h1>
    </div>
  );
}

export default App;
