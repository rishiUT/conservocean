import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Impact from "./ImpactInstance";
import ImpactCard from "./ImpactCard";
import Impacts from "./Impacts";

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

//This mocks the map modules, which are not implemented by JSX
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

it("Renders an Impact Instance Page", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<Impact match={test} />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders an Impact Card", () => {
  act(() => {
    const test: any = { params: { id: 1 } };
    render(<ImpactCard impact={<Impact match={test} />} />, container);
  });
  expect(container.textContent).not.toBe(null);
});

it("Renders an Impact Table", () => {
  act(() => {
    render(
      <Router>
        <Impacts />
      </Router>,
      container
    );
  });
  expect(container.textContent).not.toBe(null);
});
