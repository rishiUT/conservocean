import React from "react";
import "bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Page Components
import Home from "./pages/Home";
import About from "./pages/About";
import SpeciesGrid from "./pages/Species";
import Impacts from "./pages/Impacts";
import WaterBodies from "./pages/WaterBodies";

import Navbar from "./parts/Navbar";


function App() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        {/* Site-wide navigation bar */}
        <Navbar />

        {/* <Switch> renders the first route that matches current URL */}
        <Switch>
          <Route path="/species" children={<SpeciesGrid />} />
          <Route path="/water-bodies" children={<WaterBodies />} />
          <Route path="/impacts" children={<Impacts />} />
          <Route path="/about" children={<About />} />
          <Route exact path="/" children={<Home />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
