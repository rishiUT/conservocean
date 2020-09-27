import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
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
        {/* This is site-wide nav-bar */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/species">Species</Link>
            </li>
            <li>
              <Link to="/water-bodies">Bodies of Water</Link>
            </li>
            <li>
              <Link to="/impacts">Human Impacts</Link>
            </li>
          </ul>
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
