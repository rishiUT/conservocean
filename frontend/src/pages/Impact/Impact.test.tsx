import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Impact from "./ImpactInstance";
import ImpactCard from "./ImpactCard";
import Impacts from "./Impacts";

let container = null;
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

//This tests the impacts to ensure they load
it("Renders an Impact Instance Page", () => {
  act(() => {
    render(<Impact />, container);
  });
  expect(container.textContent).not.toBe(null);
});
