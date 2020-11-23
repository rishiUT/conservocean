import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import WaterBody from "./WaterBody";
import WBCard from "./WaterBodyCard";
import WaterBodies from "./WaterBodyGrid";

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//Mocks the missing mapbox-gl functions required by water body instances
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

//Tests water bodies to ensure they return something
it("Renders a Water Body Instance", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<WaterBody match={test} />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders a Water Body Card", () => {
  const test: any = { params: { id: 1 } };
  act(() => {
    render(<WBCard body={<WaterBody match={test} />} />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders a Water Body Grid", () => {
  act(() => {
    render(
      <Router>
        <WaterBodies />
      </Router>,
      container
    );
  });
  //switch inside router
  expect(container.textContent).not.toBe(null);
});
