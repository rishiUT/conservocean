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

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

it("Renders a Water Body Instance", () => {
  act(() => {
    render(<WaterBody />, container);
  });
  expect(container.textContent).not.toBe(null);
});

/*
it("Renders a Water Body Card", () => {
  act(() => {
    //Needs a dummy WaterBody
    render(<WBCard />, container);
  });
  expect(container.textContent).not.toBe(null);
})


it("Renders a Water Body Grid", () => {
  act(() => {
    //Switch inside a router
    render(<WaterBodies />, container);
  });
  expect(container.textContent).not.toBe(null);
})
*/
