import React from "react";
import 'bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

// Page Components
import Home from "./pages/Home";
import About from "./pages/About";
import Species from "./pages/Species";
import Impacts from "./pages/Impacts";
import WaterBodies from "./pages/WaterBodies";

function App() {
  return (
    <Router>
      <div>
        {/* This is a site-wide nav-bar */}
        <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
          <Link to="/" className={"navbar-brand"}>ConservOcean</Link>

          <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className={"navbar-toggler-icon"}></span>
          </button>


          <div className={"collapse navbar-collapse"} id="navbarSupportedContent">
            <ul className={"navbar-nav mr-auto"}>
              <li className={"nav-item"}>
                <Link to="/about" className={"nav-link"}>About</Link>
              </li>
              <li className={"nav-item"}>
                <Link to="/species" className={"nav-link"}>Species</Link>
              </li>
              <li className={"nav-item"}>
                <Link to="/water-bodies" className={"nav-link"}>Bodies of Water</Link>
              </li>
              <li className={"nav-item"}>
                <Link to="/impacts" className={"nav-link"}>Human Impacts</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* <Switch> renders the first route that matches current URL */}
        <Switch>
          <Route path="/species">
            <Species />
          </Route>
          <Route path="/water-bodies">
            <WaterBodies />
          </Route>
          <Route path="/impacts">
            <Impacts />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
