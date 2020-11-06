import React from "react";
import TestRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import WaterBody from "./WaterBody";
import WBCard from "./WaterBodyCard";
import WaterBodies from "./WaterBodyGrid";

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

//Mocks the missing mapbox-gl functions required by water body instances
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

//Tests water bodies to ensure they return something
it("Renders a Water Body Instance", () => {
  act(() => {
    render(<WaterBody />, container);
  });
  expect(container.textContent).not.toBe(null);
});